AWS_CMD=docker run --rm -it -v ~/.aws:/root/.aws -v `pwd`:/aws amazon/aws-cli

dev:
	npm run gulp

css:
	npm run tailwind:watch

deploy: build
	npm run deploy

build: 
	npm run tailwind
	npm run create-html

dns-update:
	${AWS_CMD} route53 change-resource-record-sets --profile personal --hosted-zone-id /hostedzone/ZXJ9JNTX1YMX1 --change-batch file://aws-route53-recordset.json

.PHONY: dns-update build deploy