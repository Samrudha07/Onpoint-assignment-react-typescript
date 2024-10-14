import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Github.css';


interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

const App: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [repos, setRepos] = useState<Repo[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const fetchRepos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            setRepos(response.data);
            setError('');
        } catch (err) {
            setError('User not found');
            setRepos([]);
        }
        finally{
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchRepos();
    };

    return (
        <div className="container-fluid images ">

            <div className='header'>GitHub Repositories Finder</div>
            <form onSubmit={handleSubmit}>
                <input
                className=''
                    type="text"
                    placeholder="Enter GitHub Username...."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
               { <button type="submit" className='me-2'>Search</button>}
            </form>
            {error && <div className="error"> {error}</div>}
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id}>
                        <h2>{repo.name}</h2>
                        <p>{repo.description || 'No description available'}</p>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            Visit Repository
                        </a>
                    </li>
                ))}
            </ul>
            {loading && (
                <div className="lds-dual-ring-overlay">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
        </div>
    );
};

export default App;
