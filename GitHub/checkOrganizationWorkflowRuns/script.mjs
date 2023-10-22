import fetch from 'node-fetch';
import fs from 'fs';


const TOKEN = 'YOUR_PERSONAL_ACCESS_TOKEN';
const ORG = 'YOUR_ORGANIZATION_NAME';
const START_DATE_TIME = 'START_DATE_TIME'//example for UTC zone '2023-10-01T00:00:00Z';
const END_DATE_TIME = 'END_DATE_TIME'//example for UTC zone '2023-10-01T23:59:59Z';

async function fetchRepos() {
    let repos = [];
    let pages = 1;
    const resultsPerPage = 100;

    while (true) {
        const response = await fetch(`https://api.github.com/orgs/${ORG}/repos?per_page=${resultsPerPage}&page=${pages}`, {
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const data = await response.json();

        if (data.length === 0 || !Array.isArray(data)) {
            break;
        }

        repos = repos.concat(data.map(repo => repo.full_name));
        pages++;
    }

    return repos;
}

//
async function fetchWorkflowRuns(repo) {
    const response = await fetch(`https://api.github.com/repos/${repo}/actions/runs?per_page=100`, {
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    const data = await response.json();
    return data.workflow_runs.filter(run => run.created_at >= START_DATE_TIME && run.created_at <= END_DATE_TIME);
}

async function main() {
    const repos = await fetchRepos();
    let output = [];  // Array to store the output lines

    for (const repo of repos) {
        const runs = await fetchWorkflowRuns(repo);

        if (runs.length) {
            output.push(`Found runs in ${repo}:`);
            runs.forEach(run => {
                output.push(`ID: ${run.id}, Name: ${run.name}, Created At: ${run.created_at}`);
            });
        }
    }

    // Write the output to a file
    fs.writeFileSync('output.txt', output.join('\n'), 'utf8');
}

main().catch(error => {
    console.error(error);
});