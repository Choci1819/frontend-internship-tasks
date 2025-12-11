import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DynamicPosts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data.slice(0, 10))) // Limit to 10 items
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <section className="page">
      <h1>Dynamic Data</h1>
      <div className="posts-container">
        {data.map(item => (
          <div key={item.id} className="post-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DynamicPosts;