AWS_CMD=docker run --rm -it -v ~/.aws:/root/.aws -v `pwd`:/aws amazon/aws-cli

dev:
	npm run gulp

css:
	npm run tailwind:watch

pdf:
	npm run create-pdf
	open public/brian-wigginton.pdf

full: build

build:
	npm run tailwind
	npm run create-html
	npm run create-pdf

dns-update:
	${AWS_CMD} route53 change-resource-record-sets --profile personal --hosted-zone-id /hostedzone/ZXJ9JNTX1YMX1 --change-batch file://aws-route53-recordset.json

.PHONY: build deploy pdf css