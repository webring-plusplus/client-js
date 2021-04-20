/// webring("google.com", (uri, peers, depth) => console.log(uri, peers, depth) [, depth = 1]);
const webring = (uri, onsucc, depth = 1) => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://${uri}/webring++.json`, true);
  
  request.onload = () => {
    const status = request.status;
    if (200 <= status < 400) {
      const response = request.response;
      console.log(`Parsing JSON response ${response}`);
      const children = JSON.parse(response).links;
      onsucc(uri, children, depth);
      if (depth > 0) {
        children.forEach((child) => { webring(child, onsucc, depth - 1); });
      }
    }
  };
  
  request.onerror = () => {
    console.warn(`webring error on ${uri}`);
  };
  
  request.send();
}

