export async function fetchManifest(url: string) {
  if (!url) return;

  try {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data);
  } catch (err) {
    console.error(err);
  }
}
