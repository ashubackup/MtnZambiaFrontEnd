import { useEffect } from "react";

function FetchToken() {
  async function fetchTokenFromHeader(mainUrl) {
    try {
      const response = await fetch(mainUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log(`fetchTokenFromHeader ------- ${data.message}`);

      const token = response.headers.get("X-Token");
      // const token = response.headers;
      console.log("X-Token: ", token);

      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }

  const fetchData = () => {
    fetchTokenFromHeader(
      "https://callbackmtngamewin.bigcash.co.za/api/get-token"
    )
      .then((token) => console.log("Fetched token:", token))
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default FetchToken;
