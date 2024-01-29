const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_cf9d0fc4b71eefc28f2c48f751474186d4823b2c",
        options: {
            'sonar.projectName': 'CTF-frontend',
            'sonar.projectDescription': 'CTF-frontend',
            'sonar.projectKey': 'CTF-frontend-project-key',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '**/deps/**',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)