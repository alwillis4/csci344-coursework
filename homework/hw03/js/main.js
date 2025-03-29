import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "andrew";
let password = "password";

async function initializeScreen() {
  // this function is getting invoked when the page first loads:
  token = await getAccessToken(rootURL, username, password);
  showNav();
  // get posts:
  getPosts();
  // get user profile
  fetchUserProfile();
  getSuggestions();
  getStories();
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
//await / async syntax:
async function getPosts() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/posts/?limit=10",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderPosts(data);
}

function renderBookmarkButton(postJSON) {
  let template = "";
  if (postJSON.current_user_bookmark_id) {
    // already bookmarked
    template = `
            <button onclick="window.deleteBookmark(${postJSON.current_user_bookmark_id})" aria-label="Bookmark button">
                <i class="fas fa-bookmark"></i>
            </button>
        `;
  } else {
    // not bookmarked
    template = `
            <button onclick="window.createBookmark(${postJSON.id})"aria-label="Unbookmark button">
                <i class="far fa-bookmark"></i>
            </button>
        `;
  }
  return template;
}

function renderPost(postJSON) {
  const template = `
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${
                  postJSON.user.username
                }</h3>
                <button class="icon-button" aria-label="ellipsis"><i class="fas fa-ellipsis-h" ></i></button>
            </div>
            <img src="${
              postJSON.image_url
            }" alt="placeholder image" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${renderLikeButton(postJSON)}
                        <button aria-label="Comment button"><i class="far fa-comment" ></i></button>
                        <button aria-label="Message Button"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${renderBookmarkButton(postJSON)}
                    </div>
                </div>
                <p class="font-bold mb-3">${postJSON.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${postJSON.user.username}</strong>
                        ${
                          postJSON.caption
                        } <button class="button" aria-label="more"></button>
                    </p>
                </div>
                ${renderComments(postJSON)}
                
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment..." aria-label="Textbox for comments">
                </div>
                <button class="text-blue-900 py-2" aria-label="Post button">Post</button>
            </div>
        </section>
    `;
  const container = document.querySelector("main");
  container.insertAdjacentHTML("beforeend", template);
}

function renderPosts(postListJSON) {
  // option 1:
  postListJSON.forEach(renderPost);
}

//await / async syntax:
window.createBookmark = async function (postId) {
  const postData = {
    post_id: postId,
  };
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/bookmarks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteBookmark = async function (bookmarkId) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

async function fetchUserProfile() {
  try {
    const response = await fetch(
      "https://photo-app-secured.herokuapp.com/api/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }
    const userData = await response.json();
    renderUserProfile(userData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    profileContainer.innerHTML = "<p>Error loading profile</p>";
  }
}

function renderUserProfile(user) {
  const template = `
          <header class="flex gap-4 items-center">
            <img src="${user.thumb_url}" alt="user's picture" class="rounded-full w-16" />
            <h2 class="font-Comfortaa font-bold text-2xl">${user.username}</h2>
        </header>
      `;
  const container = document.querySelector("aside");
  container.insertAdjacentHTML("afterbegin", template);
}

async function getSuggestions() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/suggestions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderSuggestions(data);
}
function renderSuggestion(data) {
  const template = `
  <section class="flex justify-between items-center mb-4 gap-2">
                <img src="${data.thumb_url}" alt="suggestions" class="rounded-full" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${data.username}</p>
                    <p class="text-gray-900 text-xs">suggested for you</p>
                </div>
                <button class="text-blue-900 text-sm py-2">follow</button>
            </section>
`;
  const container = document.querySelector("#suggestions");
  container.insertAdjacentHTML("afterbegin", template);
}

function renderSuggestions(postSuggestionsJSON) {
  postSuggestionsJSON.forEach(renderSuggestion);
}

async function getStories() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/stories",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderStories(data);
}

function renderStory(data) {
  const template = `
  <div class="flex flex-col justify-center items-center"> 
                <img src="${data.user.thumb_url}" alt=" for suggestions" class="rounded-full border-4 border-gray-300" />
                <p class="text-xs text-gray-500">${data.user.username}</p>
            </div>
                
`;
  const container = document.querySelector("#stories");
  container.insertAdjacentHTML("afterbegin", template);
}

function renderStories(postStoriesJSON) {
  postStoriesJSON.forEach(renderStory);
}

function renderLikeButton(postJSON) {
  let template = "";
  if (postJSON.current_user_like_id) {
    // already
    template = `
            <button onclick="window.deleteLike(${postJSON.current_user_like_id})" aria-label="Unlike button">
                <i class="fas fa-heart text-red-700"></i>
            </button>
        `;
  } else {
    // not like
    template = `
            <button onclick="window.createLike(${postJSON.id})" aria-label="Like button">
                <i class="far fa-heart"></i>
            </button>
        `;
  }
  return template;
}

window.createLike = async function (postId) {
  const postData = {
    post_id: postId,
  };
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/likes/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteLike = async function (likeId) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/likes/${likeId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};
function renderComments(postJSON) {
  const comments = postJSON.comments;
  if (comments.length === 0) {
    return `<p class="text-sm text-gray-500">No comments yet</p>`;
  } else if (comments.length === 1) {
    return `
      <p class="text-sm mb-3">
        <strong>${comments[0].user.username}</strong> ${comments[0].text}
      </p>
    `;
  } else {
    return `
      <p class="text-sm text-gray-500 mb-2">View all ${
        comments.length
      } comments</p>
      <p class="text-sm mb-3">
        <strong>${comments[comments.length - 1].user.username}</strong> ${
      comments[comments.length - 1].text
    }
      </p>
    `;
    // const template = `
    // <p class="text-sm mb-3">
    // ${data.text}
    //                   <strong>${data.username}</strong>
    //                   ${data.text}
    //               </p>
    //               <p class="text-sm mb-3">
    //                   <strong>${data.user.username}</strong>
    //                   ${data.text}
    //               </p>
    //               <p class="uppercase text-gray-500 text-xs">1 day ago</p>
    // `;
  }
}
// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
