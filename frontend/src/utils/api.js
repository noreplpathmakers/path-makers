export const API_URL = 'https://path-makers.onrender.com/api';

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    let data;
    try {
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch (e) {
            // If response is not JSON (e.g., 500 HTML error), throw text or generic error
            throw new Error(response.statusText || 'Server Error: ' + text.substring(0, 50));
        }
    } catch (err) {
        throw new Error(err.message || 'Network Error');
    }

    if (!response.ok) {
        throw new Error(data.msg || data.message || 'Login failed');
    }
    return data;
};
