const users = document.querySelector("#users");
const pagination = document.querySelector("#pagination");


/////  session for managing the users

if(sessionStorage.getItem("userName")){
  document.getElementById("login_home").innerHTML='<a href="" class="nav_link">'+sessionStorage.getItem("userName")+'</a>';
}else{
  document.getElementById("login_home").innerHTML='<a href="login.html" class="nav_link">LOGIN</a>';

}



let paginationState = {
  offset: 0,
  limit: 5,
  page: 1,
  count: 0,
};
const navigate = async (e = null, offset = 0, limit = 5) => {
  //if it's not the first load
  if (e) {
    //if we click on Previous
    if (e.target.attributes.direction.value === "prev") {
      paginationState.offset -= 5;
      paginationState.page--;
    }
    //if we click on Next
    else if (e.target.attributes.direction.value === "next") {
      paginationState.offset += 5;
      paginationState.page++;
    }
    //if we click on a page number
    else {
      paginationState.offset = offset;
      paginationState.limit = limit;
      paginationState.page = e.target.innerText;
    }
}

  users.innerHTML = "";
  await fetch(
    `http://localhost:3000/articles?offset=${paginationState.offset}&limit=${paginationState.limit}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.map((user) => {
        let w = user.content.split(' ');
        let firstwords = "";
        for(let i=0;i<10;i++){
            firstwords+= w[i]+" ";
        }
        firstwords +="...";
        let nbr = (Math.ceil(Math.random()*1000))%600;
        users.innerHTML += `
        <div class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-2 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 " style="color:tomato;">${user.id}</strong>
                    <h3 class="mb-0" >${user.title}</h3>
                    <div class="mb-1 text-muted">${user.UpdatedAt}</div>
                        <p class="card-text mb-auto">${firstwords}</p>
                        <a href="../articleDetails.html?id=${user.id}" class="stretched-link">Continue reading</a>
                    </div>
                <div class="col-auto d-none d-lg-block">
                <img src="https://picsum.photos/${nbr}" class="bd-placeholder-img" width="200" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></img>

                </div>
            </div>
        </div>`;
      });
    });

  buildPagination(paginationState.page);
};

const buildPagination = async (page = 1, offset = 0, limit = 5) => {
  //clear the pagination first
  pagination.innerHTML = "";

  //add the previous button
  pagination.innerHTML += `
  <li ${
    paginationState.offset - 5 < 0
      ? 'class="page-item disabled"'
      : 'class="page-item"'
  }>
        <a class="page-link" href="#" onclick="navigate(event)" direction="prev">Previous</a>
    </li>`;
  await fetch(`http://localhost:3000/articles`)
    .then((response) => response.json())
    .then((data) => {
      paginationState.count = data.length;
      data.slice(offset, Math.round(data.length / 5)).map((user, i) => {
        //add page number buttons
        pagination.innerHTML += `
        <li ${page == i + 1 ? 'class="page-item active"' : 'class="page-item"'}>
            <a class="page-link" href="#" onclick="navigate(event, ${offset},${limit})" direction="page">${
          i + 1
        }</a>
        </li>`;
        offset += 5;
      });
    });
  //add the next button
  pagination.innerHTML += `
      <li ${
        paginationState.offset + 5 < paginationState.count
          ? 'class="page-item"'
          : 'class="page-item disabled"'
      }>
          <a class="page-link" href="#" onclick="navigate(event)" direction="next">Next</a>
      </li>`;
};

const addUser = async (event) => {
  Swal.fire({
    // title: "",
    html: `<form  method="post" onsubmit="addUser(event)">
      <tr>
        <td>Username:</td>
        <td><input value="username" id="username" type="text" class="form-control"></td>
      </tr>
      <tr>
        <td>Email:</td>
        <td><input value="email@email.cc" id="email" type="email" class="form-control"></td>
      </tr>
      <tr>
        <td>Password:</td>
        <td><input value="password123" id="password" type="password" class="form-control"></td>
      </tr>
      <tr>
        <td>Role:</td>
        <td>
          <select id="role" class="form-control">
            <option value="admin">admin</option>
            <option selected value="author">author</option>
            <option value="guest">guest</option>
          </select>
        </td>
      </tr>
    </form>
  </div>`,
    confirmButtonText: "Add User",
    focusConfirm: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({
          username: Swal.getPopup().querySelector("#username").value,
          email: Swal.getPopup().querySelector("#email").value,
          password: Swal.getPopup().querySelector("#password").value,
          role: Swal.getPopup().querySelector("#role").value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: data.error,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.f;
            ire({
              title: "Success!",
              text: "Success",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
    }
  });
};


async function addtest(){

  console.log("test");

  if(sessionStorage.getItem("userName")){
    await fetch(`http://localhost:3000/articles`, {
    method: "POST",
    body: JSON.stringify({
      title: document.querySelector("#title").value,
      content: document.querySelector("#content").value,
      published: true,
      UserId: sessionStorage.getItem("userId")
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  }else{
    alert("login to post the article");
  }
  
  

  console.log("test2");

}

async function login(){

  console.log("login");

  let username=document.getElementById("username").value;
  let userExist=true;
  let loginstatus='';
  let data = await fetch(`http://localhost:3000/users?name=${username}`)
    .then((response) => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        userExist=false;
        console.error(error);
    });

    if(userExist){
      sessionStorage.setItem("userName",username);
      sessionStorage.setItem("userId",data.id);
      console.log(data.id);
      document.getElementById("login_home").innerHTML='<a href="" class="nav_link">'+sessionStorage.getItem("userName")+'</a>';
      loginstatus='wellcome '+username;

    }else{
      loginstatus='this username does not exist';
    }

    document.getElementById("login_status").innerHTML=loginstatus;

  /*await fetch(
    `http://localhost:3000/users?name=${username}`
  )
    .then((response) => 
        response.json())
    .then((user) => {
      console.log("hiii2");
      if(user){
        if(user.username==username){
          userExist=true;
        }
      }

    });

    if(userExist){
      sessionStorage.setItem("userName",username);
      loginstatus='wellcome '+username;
    }else{
      loginstatus='this username does not exist';
    }

    document.getElementById("login_status").innerHTML=loginstatus;*/

}

const addArticle = async (event) => {
  Swal.fire({
    // title: "",
    html:  `<form  method="post" onsubmit="addArticle(event)" class="article_form">
                Username:
                <div><input value="username" id="username" type="text" class="form-control"></div>
                <div>Email:</div>
                <div><input value="email@email.cc" id="email" type="email" class="form-control"></div>
                <div>title:</div>
                <div><input  id="title" type="text" class="form-control"></div>
                <div>content:</div>
                <div><textarea  id="content"  class="article_area"></textarea></div>
                <div>Role:</div>
            </form>
          </div>`,
    confirmButtonText: "Add User",
    focusConfirm: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/articles`, {
        method: "POST",
        body: JSON.stringify({
          title: Swal.getPopup().querySelector("#title").value,
          content: Swal.getPopup().querySelector("#content").value,
          published: true,
          UserId: sessionStorage.getItem("userId")
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: data.error,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.f;
            ire({
              title: "Success!",
              text: "Success",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
    }
  });
};





const updateUser = async (event, id, username, email) => {
  Swal.fire({
    // title: "",
    html: `<form  method="post" onsubmit="addUser(event)">
      <tr>
        <td>Username:</td>
        <td><input value=${username} id="username" type="text" class="form-control"></td>
      </tr>
      <tr>
        <td>Email:</td>
        <td><input value=${email} id="email" type="email" class="form-control"></td>
      </tr>
      <tr>
        <td>Password:</td>
        <td><input id="password" type="password" class="form-control"></td>
      </tr>
      <tr>
        <td>Role:</td>
        <td>
          <select id="role" class="form-control">
            <option value="admin">admin</option>
            <option selected value="author">author</option>
            <option value="guest">guest</option>
          </select>
        </td>
      </tr>
    </form>
  </div>`,
    confirmButtonText: "Update User",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          username: Swal.getPopup().querySelector("#username").value,
          email: Swal.getPopup().querySelector("#email").value,
          password: Swal.getPopup().querySelector("#password").value,
          role: Swal.getPopup().querySelector("#role").value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: data.error,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Success",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
    }
  });
};

const deleteUser = async (event, userId) => {
  event.preventDefault();
  Swal.fire({
    title: "Are you sure you want to delete?",
    showDenyButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: data.error,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Success",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
    }
  });
};


buildPagination();
navigate();
