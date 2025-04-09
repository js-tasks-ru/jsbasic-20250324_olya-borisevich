function makeFriendsList(friends) {
  let listFriend = document.createElement('ul'),
    friend = '';

  for (item in friends) {
    friend += `<li>${friends[item].firstName} ${friends[item].lastName}</li>`;
  }

  listFriend.innerHTML = friend;

  return listFriend;
}
