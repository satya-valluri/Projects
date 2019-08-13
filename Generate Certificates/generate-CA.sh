#!/usr/bin/env bash
#generate-CA.sh - Create CA key-pair

# Usage :
#./generate-CA.sh

# Output files
# ca.crt ca.key

set -e
export LANG=C

# If no user is defined lets use root
[ -z "$USER" ] && USER=root

# Output files wrt current dir
DIR=${TARGET:='.'}

# A space-separated list of alternate hostnames (subjAltName) may be empty ""
CA_ORG='/O=WALLURI/OU=WALLURI_ABILITY/emailAddress=ca@WALLURI.com'
CA_DN="/CN=CA CERT FOR EDGE${CA_ORG}"
CACERT=${DIR}/ca SERVER="${DIR}/${host}"
SERVER_DN="/CN=${host}$CA_ORG"
keybits=2048
openssl=$(which openssl)
MOSQUITTOUSER=${MOSQUITTOUSER:=$USER}
defaultmd="-sha512"
MAX_DAYS=365

if [ ! -f $CACERT.crt ]; then

	# Create un-encrypted (!) key 
	# TODO : should generate an encrypted key
	$openssl req -newkey rsa:${keybits} -x509 -nodes $defaultmd -days $MAX_DAYS -extensions v3_ca -keyout $CACERT.key -out $CACERT.crt -subj "${CA_DN}"
#	echo "Created CA certificate in $CACERT.crt"
	$openssl x509 -in $CACERT.crt -nameopt multiline -subject -noout

	chmod 400 $CACERT.key
	chmod 444 $CACERT.crt
	chown $MOSQUITTOUSER $CACERT.*
fi

if [ -f $CACERT.crt ]; then
	echo "----- SUCCESSFULLY GENERATED $CACERT.crt -----"
	exit 0
else
	echo "ERROR : Failed to generate $CACERT.crt file"
	exit 1
fi

