function getUsersData() {
  var inputDomElement = document.querySelector("input");
  var userName = inputDomElement.value;

  // send get request to the github server
  fetch(`https://api.github.com/users/${userName}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      var repos_url = data.repos_url;
      var userImage = data.avatar_url;
      var name = data.name;
      var bio = data.bio;

      document.querySelector("img").src = userImage;
      document.querySelector("h3").innerText = name || `unknown Name`;
      document.querySelector("p").innerText =
        bio ||
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio exercitationem aut tenetur!";

      fetch(repos_url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          var reposdata = data.slice(0, 10);
          var collection_lis = document.querySelectorAll("li");
          collection_lis.forEach((li) => {
            li.style.color = "red";
            li.innerText = "no Repo's to display";
          });

          reposdata.forEach((repos, index) => {
            collection_lis[
              index
            ].innerHTML = `<a style='text-decoration:none;color:green' href="${repos.html_url}" target="_blank">${repos.html_url}</a>`;
            collection_lis[index].style.color = "green";
          });
        });
    })

    .catch((error) => {
      console.log("somenthing went wrong");
    });
}
