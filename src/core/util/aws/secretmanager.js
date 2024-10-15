import AWS from 'aws-sdk';

const secretManager = new AWS.SecretsManager({
    region: process.env.AWS_REGION,
    credentials:{
accessKeyId: 'jhlifvhflhv',
secretAccessKey: 'hgu768yucvvhlkjh'
    }
});

export async function initializeSecrets(){
    const secrets = await secretManager.getSecretValue({
        secretId: process.env.AWS_SECRET
    })
    .promise();

    const secret = JSON.parse(secrets.SecretString);
    Object.assign(process.env, secret);
    console.log('secretsss', secret);
    return secret;
}