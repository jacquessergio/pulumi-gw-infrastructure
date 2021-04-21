"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

let environment = new pulumi.Config();

let gateway = {
    domain_name: environment.require("domain_name"),
    environment: environment.require("environment"),
    resource_name: environment.require("resource_name"),
    endpoint_type: environment.require("endpoint_type"),
    certificateArn: environment.require("certificate_arn"),
    security_policy: environment.require("security_policy")
}

const resourceName = `${gateway.resource_name}-${gateway.environment}`;

const webDomain = new aws.apigatewayv2.DomainName(resourceName, {

    domainName: gateway.domain_name,
    domainNameConfiguration: {
        certificateArn: gateway.certificateArn,
        endpointType: gateway.endpoint_type,
        securityPolicy: gateway.security_policy,
    },
    tags: {
        Name: resourceName,
        Environment: gateway.environment
    }
});