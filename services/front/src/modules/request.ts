export default async function request(url: string, method: string = 'GET', body?: any) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error('Status error');
    }

    let contentType = response.headers.get('Content-Type');

    if (!contentType) {
        return;
    }

    contentType = contentType.toLowerCase();

    if (contentType.match('application/json')) {
        return await response.json();
    }

    if (contentType.match('text/plain')) {
        return await response.text();
    }
}
