#!/bin/bash

#USAGE : sudo bash generate-CLIENT.sh certname
# Optional arguments :$#: 1 # client certificate name
#If no arguments are passed in the command line security files with the name client will be generated.
#certname.pfx file will also be generated

#location of files
dir='.'

#if predefined variable USER is null or empty; grant permission to root user
[ -z "$USER" ] && USER=root

#Store the current user in a variable- could be root or loggedin user
mosquittoclientuser=$USER

#location of openssl
openssl=$(which openssl)

#default name of client files
#host="client"

if [ $# -ne 1 ];then
	host="client"
else
	host="$1"
fi

#file name
client="$dir/$host"

#
keybits=2048

#number of days 
noofdays=365

#exit if the necessary files are not present
if [[ ! -f ca.key && ! -f ca.crt ]]; then
        echo "Warning : Can not find ca.key and ca.crt in the current location - exiting script"
        exit 1
fi

#generate client KEY and client CSR
if [[ ! -f $client.key && ! -f $client.csr ]];then
	#echo "----- Generating ${client}.key -----"
	$openssl genrsa -out $client.key 2048
	#echo "----- Generating ${client}.csr -----"
	$openssl req -new \
		-out $client.csr \
		-key $client.key \
		-subj "/CN=client/O=example.com"

	chmod 400 $client.key
	chown $mosquittoclientuser $client.key
fi

#check if above files are created
if [[ ! -f $client.key && ! -f $client.csr ]]; then
	echo "FAILED TO GENERATE $client.key AND $client.csr"
	exit 1
else
	echo "----- SUCCESSFULLY GENERATED $client.key AND $client.csr -----"
fi

#create client certificate
if [[ -f $client.csr && ! -f $client.crt ]];then
	#echo "----- GENERATING ${client}.crt -----"
	$openssl x509 -req \
		-in $client.csr \
		-CA ./ca.crt \
		-CAkey ./ca.key \
		-CAcreateserial -CAserial ./ca.srl \
		-out $client.crt \
		-days $noofdays \
		-addtrust clientAuth

	if [[ -f $client.crt ]];then
		chmod 400 $client.crt
		chown $mosquittoclientuser $client.crt
		echo "----- SUCCESSFULLY GENERATED ${client}.crt ------"
	else
		echo "----- ERROR : COULD NOT  GENERATE $client.crt -----"
		exit 1
	fi
fi

if [[ -f $client.key && -f $client.crt ]];then
	openssl pkcs12 -export \
		-in $client.crt \
		-inkey $client.key \
		-out $client.pfx \
		-passout pass:""
	if [[ -f $client.pfx ]];then
		chmod 400 $client.pfx
		chown $mosquittoclientuser $client.key
		echo "----- SUCCESSFULLY GENERATED $client.pfx -----"
	else
		echo "----- ERROR : 	FAILED TO GENERATE $client.pfx -----"
		exit 1
	fi
fi

exit 0
