
export async function getData(url) {
    return fetch(
        url,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json"
          })
        }
      )
        .then(res => res.json())
}