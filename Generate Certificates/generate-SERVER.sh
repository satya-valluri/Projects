#!/usr/bin/env bash

#FileName : generate-SERVER.sh
#Create Server key-pair files

# Usage: 1 optional argument which is the name of the server certificate
#./generate-CA.sh hostname
# Output files	creates hostname.key and hostname.crt if argument is specified 
# or server.key and server.crt else the computer name will be taken

set -e

export LANG=C

# if no argument is passed we will output server.ca server.crt as these will be hardcoded in mosquitto.conf
if [[ $# -ne 1 ]]; then
	#host=$(hostname -f)
	host="server"
else
	host="$1"
fi

#if PREDEFINED variable USER is null ; lets use root as the USER
[ -z "$USER" ] && USER=root

#current directory to name all other file paths; as TARGET is not mentioned DIR will point to '.'
DIR=${TARGET:='.'}

# A space-separated list of alternate hostnames (subjAltName); may be empty ""
CA_ORG='/O=WALLURI_WALLURI/OU=WALLURI_WALLURI_EDGE/emailAddress=broker@WALLURIWALLURIedge.com'
CA_DN="/CN=EDGE CONNECT BROKER CERTIFICATE${CA_ORG}"

#path and name of CA file with out extension: ./ca
CACERT=${DIR}/ca

#path and name of the server security files ; ./commandlineparam
SERVER="${DIR}/${host}"

#TODO:
SERVER_DN="/CN=${host}$CA_ORG"

keybits=2048

#location of openssl
openssl=$(which openssl)

# If MOSQUITTOUSER does not exist ; the user pointing to  $USER will be our MOSQUITTOUSER
brokeruser=${brokeruser:=$USER}

#hasing algorithm used
defaultmd="-sha512"

#number of days the certificate is valid.
days=365

function getipaddresses() {
	/sbin/ifconfig | grep -v tunnel |
			sed -En '/inet6? /p' |
			sed -Ee 's/inet6? (addr:)?//' |
			awk '{print $1;}' | 
			sed -e 's/[%/].*//' | 
			egrep -v '(::1|127\.0.0.1)'
}

function addresslist() {
	ALIST=""
	for a in $(getipaddresses); do
		ALIST="${ALIST}IP:$a,"
	done
	ALIST="${ALIST}DNS:localhost"
	echo $ALIST
}

#exit if the necessary files are not present
if [[ ! -f ca.key && ! -f ca.crt ]]; then
	echo "Warning : Can not find ca.key and ca.crt in the current location - exiting script"
	exit 1
fi

if [[ ! -f $SERVER.key ]]; then
	$openssl genrsa -out $SERVER.key $keybits
	$openssl req -new $defaultmd \
		-out $SERVER.csr \
		-key $SERVER.key \
		-subj "${SERVER_DN}"
	chmod 400 $SERVER.key
	chown $brokeruser $SERVER.key
fi

if [[ -f $SERVER.key && -f $SERVER.csr ]]; then
	echo "----- SUCCEESSFULLY GENERATED $SERVER.key and $SERVER.csr -----"
else
	echo "ERROR : ----- FAILED TO GENERATE $SERVER.key OR $SERVER.csr ----- exiting"
	exit 1
fi

if [[ -f $SERVER.csr && ! -f $SERVER.crt ]]; then

	# can not pass subjAltName on the CLI so create and use a cnf file.
	# here-command used; limiter is !ENDCONFIG

	CNF=`mktemp /tmp/cacnf.XXXXXXXX` || { echo "$0: can't create temp file" >&2; exit 1; }
	sed -e 's/^.*%%% //' > $CNF <<\!ENDconfig
	%%% [ JPMextensions ]
	%%% basicConstraints        = critical,CA:false
	%%% nsCertType              = server
	%%% keyUsage                = nonRepudiation, digitalSignature, keyEncipherment
	%%% nsComment               = "EDGE Broker Certificate"
	%%% subjectKeyIdentifier    = hash
	%%% authorityKeyIdentifier  = keyid,issuer:always
	%%% subjectAltName          = $ENV::SUBJALTNAME
	%%% # issuerAltName           = issuer:copy
	%%% ## nsCaRevocationUrl       = http://website.com/revokeCA/
	%%% ## nsRevocationUrl         = http://website.org/revokeCA/
	%%% certificatePolicies     = ia5org,@polsection
	%%% 
	%%% [polsection]
	%%% policyIdentifier	    = 1.3.5.8
	%%% CPS.1		    = "http://localhost"
	%%% userNotice.1	    = @notice
	%%% 
	%%% [notice]
	%%% explicitText            = ""
	%%% organization            = "WALLURI WALLURI Edge"
	%%% noticeNumbers           = 1

!ENDconfig

	SUBJALTNAME="$(addresslist)"
	echo "${SUBJALTNAME}"
	export SUBJALTNAME

	#echo "----- GENERATING A SELF SIGNED SERVER CERTIFICATE $SERVER.crt"
	$openssl x509 -req $defaultmd \
		-in $SERVER.csr \
		-CA $CACERT.crt \
		-CAkey $CACERT.key \
		-CAcreateserial \
		-CAserial "${DIR}/ca.srl" \
		-out $SERVER.crt \
		-days $days \
		-extfile ${CNF} \
		-extensions JPMextensions

	rm -f $CNF
	chmod 444 $SERVER.crt
	chown $brokeruser $SERVER.crt
fi

if [[ -f $SERVER.crt ]];then
	echo "----- SUCCESSFULLY GENERATED $SERVER.crt -----"
else
	echo "----- ERROR : FAILED TO GENERATE $SERVER.crt"
	exit 1
fi

exit 0
