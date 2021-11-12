const baseUrl = 'https://jsonplaceholder.typicode.com';
const loadingUsersDOM = document.querySelector('.loading-users');
const loadingPostsDOM = document.querySelector('.loading-posts');
const usersDOM = document.querySelector('.users');
const authorDOM = document.querySelector('.posts-author');
const postsDOM = document.querySelector('.posts');

const getAndShowUsers = async () => {
  loadingUsersDOM.style.visibility = 'visible';
  try {
    const { data } = await axios.get(`${baseUrl}/users`);
    const usersElements = data
      .map((user) => {
        const { name, id } = user;
        return `<tr onClick="getAndShowPosts(${id}, '${name}')"><td>${name}</td></tr>`;
      })
      .join('');
    usersDOM.innerHTML = `<th>Authors</th>${usersElements}`;
  } catch (error) {
    usersDOM.innerHTML =
      '<h5 class="error">There was an error, please try later....</h5>';
  }
  loadingUsersDOM.style.visibility = 'hidden';
};

getAndShowUsers();

const getAndShowPosts = async (id, name) => {
  loadingPostsDOM.style.visibility = 'visible';
  authorDOM.innerHTML = `Posts by ${name}`;
  try {
    const { data } = await axios(`${baseUrl}/users/${id}/posts`);
    const postsElements = data
      .map((post) => {
        const { title, body } = post;
        return `<article class="post"><h2 class="post-title">${title}</h2><p class="post-body">${body}</p></article>`;
      })
      .join('');
    postsDOM.innerHTML = postsElements;
  } catch (error) {
    postsDOM.innerHTML =
      '<h5 class="error">There was an error, please try later....</h5>';
  }
  loadingPostsDOM.style.visibility = 'hidden';
};
