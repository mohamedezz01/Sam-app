///////////sign in//////////////////
document.addEventListener('DOMContentLoaded', () => {
  const signInBtn = document.getElementById('signinBtn');
  if (signInBtn) {
    signInBtn.addEventListener('click', async () => {
      const Email = document.getElementById('emailInput').value;
      const Password = document.getElementById('passwordInput').value;

      if (Email.trim() === '' || Password.trim() === '') {
        alert('Please enter both email and password');
        return;
      }

  const data = {
    "Email": Email,
    "Password": Password
  }; 

  try {
    const response = await fetch('http://localhost:3000/User/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) { 
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();

    if (responseData.token) {
      sessionStorage.setItem('token', responseData.token);
      sessionStorage.setItem('Email', Email);
     
      const userID = parseUserId(responseData.token);
      sessionStorage.setItem('userID', userID);
      const url = new URL('file:///D:/3rd%20year/web/home.html');
      url.searchParams.append('userID', userID);
      window.location.href = url.href;
      console.log('userID:', userID );
  
    } else {
      alert('Invalid email or password. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.message); 
  }
})  
}  }) ;     


  ///////////sign up////////////////

document.addEventListener('DOMContentLoaded', () => {
  const signUpBtn = document.getElementById('signUpBtn');
  if (signUpBtn) {
  signUpBtn.addEventListener('click', async () => { 
  const FirstName = document.getElementById('FirstName').value;
  const LastName = document.getElementById('LastName').value;
  const Email = document.getElementById('Email').value;
  const Phone = document.getElementById('Phone').value;
  const Password = document.getElementById('Password').value;
  const ConfirmPassword = document.getElementById('ConfirmPassword').value;
  const Governorate = document.getElementById('Governorate').value;
  const DateOfBirth = document.getElementById('DateOfBirth').value;
if (!DateOfBirth) {
  console.error('Date of Birth input not found');
  return;
}

const parts = DateOfBirth.split(/[/-]/);  // Split by slash, hyphen, or dash

if (parts.length !== 3 ||
  isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
  console.error('Invalid Date of Birth format');
  return;
}

const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
console.log('Formatted Date of Birth:', formattedDate);

const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
if (!datePattern.test(formattedDate)) {
  console.error('Date of Birth is not in DD/MM/YYYY format');
  return;
}


  if (FirstName.trim() === '' || LastName.trim() === '' || Email.trim() === '' || Phone.trim() === '' || Password.trim() === '' || ConfirmPassword.trim() === ''
   || Governorate.trim() === '' || formattedDate .trim() === ''
) {
    alert('Please fill in all fields');
    return;
  }

  if (Password !== ConfirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const data1 = {
    "Email": Email,
    "Password": Password,
    "ConfirmPassword": ConfirmPassword,
    "FirstName": FirstName,
    "LastName": LastName,
    "Phone": Phone,
    "Governorate": Governorate,
    "DateOfBirth": DateOfBirth 
  };

  try {
    const response = await fetch('http://localhost:3000/User/signup', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      // "Authorization": `SAM ${token}`
       },
      body: JSON.stringify(data1)
    });

    if (!response.ok) { 
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();

    if (responseData.token) {
      sessionStorage.setItem('token', responseData.token);
      sessionStorage.setItem('Email', Email);
     
      const userID = parseUserId(responseData.token);
      sessionStorage.setItem('userID', userID);
      const url = new URL('file:///D:/3rd%20year/web/home.html');
      url.searchParams.append('userID', userID);
      window.location.href = url.href;
      console.log('userID:', userID );
     
    } else {
      alert((errorData.message)
      );
    }
  } catch (error) {
    console.error('Error:', error);
    alert(errorData.message); 
  }
})  
}  }) ;     
////////////////buy/////////////////
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("find").addEventListener("click", async function () {
    const Square_Meter = document.getElementById("Square_Meter").value.trim();
    const Age_of_house = document.getElementById("Age_of_house").value.trim();
    const Total_rooms = document.getElementById("Total_rooms").value.trim();
    const Total_Bath = document.getElementById("Total_Bath").value.trim();
    const Floor = document.getElementById("Floor").value.trim();
    const City = document.getElementById("City").value.trim();

    if (Square_Meter === '' || Age_of_house === '' || Total_rooms === '' || Total_Bath === '' || Floor === '' || City === '') {
      alert('Please fill in all fields');
      return;
    }
    const BData = {
      "Square_Meter": Square_Meter,
      "Age_of_house": Age_of_house,
      "Total_rooms": Total_rooms,
      "Total_Bath": Total_Bath,
      "Floor": Floor,
      "City": City
    };

    const token = sessionStorage.getItem('token'); 
    try {
      const response = await fetch("http://localhost:3000/Buy/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `SAM ${token}`
        },
        body: JSON.stringify(BData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const buyData = await response.json();
      if (buyData.Price !== undefined) {
        document.getElementById("Bprice").value = buyData.Price + " EGP"; // Set price in the input field
      
        if (buyData.NearestMatch) {
          const nearestMatch = buyData.NearestMatch;
          document.getElementById("NearestMatch").innerHTML = `Nearest Match: in ${nearestMatch.City}`;
      
          // Set labels
          document.getElementById("Square_Meter_label").textContent = `Size: ${nearestMatch.Square_Meter}`;
          document.getElementById("Age_of_house_label").textContent = `Age of House: ${nearestMatch.Age_of_house}`;
          document.getElementById("Total_rooms_label").textContent = `Rooms: ${nearestMatch.Total_rooms}`;
          document.getElementById("Total_Bath_label").textContent = `Bathrooms: ${nearestMatch.Total_Bath}`;
          document.getElementById("Floor_label").textContent = `Floor: ${nearestMatch.Floor}`;
          document.getElementById("City_label").textContent = `City: ${nearestMatch.City}`;
      
          console.log('Nearest Match:', nearestMatch);
        } else {
          document.getElementById("NearestMatch").innerHTML = "";

          document.getElementById("Square_Meter_label").textContent = '';
          document.getElementById("Age_of_house_label").textContent = '';
          document.getElementById("Total_rooms_label").textContent = '';
          document.getElementById("Total_Bath_label").textContent = '';
          document.getElementById("Floor_label").textContent = '';
          document.getElementById("City_label").textContent = '';
        }
      } else {
        document.getElementById("Bprice").value = "Not Available";
        document.getElementById("NearestMatch").innerHTML = "";
        document.getElementById("Square_Meter_label").textContent = '';
        document.getElementById("Age_of_house_label").textContent = '';
        document.getElementById("Total_rooms_label").textContent = '';
        document.getElementById("Total_Bath_label").textContent = '';
        document.getElementById("Floor_label").textContent = '';
        document.getElementById("City_label").textContent = '';
      }
      console.log('Buy prediction successful!');
}
  catch (error) {
      document.getElementById("Bprice").value = "Not Availables";
    }
  });
});

///////////rent//////////////
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("findButton").addEventListener("click", async function() {
    const Square_Meter = document.getElementById("Square_Meter").value;
    const Age_of_house = document.getElementById("Age_of_house").value;
    const Total_rooms = document.getElementById("Total_rooms").value;
    const Total_Bath = document.getElementById("Total_Bath").value;
    const Floor = document.getElementById("Floor").value;
    const City = document.getElementById("City").value;

    if (Square_Meter.trim() === '' || Age_of_house.trim() === '' || Total_rooms.trim() === '' || Total_Bath.trim() === '' || Floor.trim() === '' || City.trim() === '') {
      alert('Please enter all fields');
      return;
    }
    const Data = {
      "Square_Meter": Square_Meter,
      "Age_of_house": Age_of_house,
      "Total_rooms": Total_rooms,
      "Total_Bath": Total_Bath,
      "Floor": Floor,
      "City": City
    };
    const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
    try {
      const response = await fetch("http://localhost:3000/Rent/predictRent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `SAM ${token}`
        },
        body: JSON.stringify(Data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const rentData = await response.json();
      if (rentData.Price !== undefined) {
        document.getElementById("Price").value = rentData.Price + " EGP"; 
      
        if (rentData.NearestMatch) {
          const nearestMatch = rentData.NearestMatch;
          document.getElementById("NearestMatch").innerHTML = `Nearest Match: in ${nearestMatch.City}`;
      
          document.getElementById("Square_Meter_label").textContent = `Size: ${nearestMatch.Square_Meter}`;
          document.getElementById("Age_of_house_label").textContent = `Age of House: ${nearestMatch.Age_of_house}`;
          document.getElementById("Total_rooms_label").textContent = `Rooms: ${nearestMatch.Total_rooms}`;
          document.getElementById("Total_Bath_label").textContent = `Bathrooms: ${nearestMatch.Total_Bath}`;
          document.getElementById("Floor_label").textContent = `Floor: ${nearestMatch.Floor}`;
          document.getElementById("City_label").textContent = `City: ${nearestMatch.City}`;
      
          console.log('Nearest Match:', nearestMatch);
        } else {
          // Clear any previous nearest match data
          document.getElementById("NearestMatch").innerHTML = "";
      
          document.getElementById("Square_Meter_label").textContent = '';
          document.getElementById("Age_of_house_label").textContent = '';
          document.getElementById("Total_rooms_label").textContent = '';
          document.getElementById("Total_Bath_label").textContent = '';
          document.getElementById("Floor_label").textContent = '';
          document.getElementById("City_label").textContent = '';
        }
      } else {
        document.getElementById("Price").value = "Not Available";
      
        // Clear any previous nearest match data
        document.getElementById("NearestMatch").innerHTML = "";
      
        document.getElementById("Square_Meter_label").textContent = '';
        document.getElementById("Age_of_house_label").textContent = '';
        document.getElementById("Total_rooms_label").textContent = '';
        document.getElementById("Total_Bath_label").textContent = '';
        document.getElementById("Floor_label").textContent = '';
        document.getElementById("City_label").textContent = '';
      }
      console.log('Buy prediction successful!');
}
  catch (error) {
      document.getElementById("Price").value = "Not Available, try again";
    }
  });
});



var a = document.getElementById("loginBtn");
  var b = document.getElementById("registerBtn");
  var x = document.getElementById("login");
  var y = document.getElementById("register");
function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}
function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}


/////////////logout////////////////
function logout() {
  sessionStorage.removeItem('token'); 
  console.log('Logged out successfully!');
  window.location.href = 'firstpage.html'; 
}

function isLoggedIn() {
  const token = sessionStorage.getItem('token');
  return token !== null; 
}

if (isLoggedIn()) {
  console.log('User is logged in.');
} else {
  console.log('User is logged out.');
}


document.addEventListener('DOMContentLoaded', () => {
  const profileInfo = document.getElementById('profileInfo');
  const infoBox = document.getElementById('infoBox');

  profileInfo.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target.classList.contains('info-item')) {
      const info = target.getAttribute('data-info');
      infoBox.textContent = info;
      infoBox.style.display = 'block';
    }
  });

  profileInfo.addEventListener('mouseout', () => {
    infoBox.style.display = 'none';
  });
});

/////////////////////////Update User's pass////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form2");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    submitButton.disabled = true;

    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const currentPassword = document.getElementById("currentPassword").value.trim();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      submitButton.disabled = false;
      return;
    }
    const Email = sessionStorage.getItem('Email');
    const userData = {
      Email: Email, 
      Password: currentPassword,
      newPassword: newPassword
    };

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error("Token not found in sessionStorage");
      submitButton.disabled = false;
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/User/ChangePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `SAM ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);

      if (data.message === "Password Updated Successfully") {
        alert("Password updated successfully");
        console.log("Password updated successfully");
      } }
     catch (error) {
      console.error(error);
      alert("Failed to update password");
    } finally {
      submitButton.disabled = false;
    }
  });
});
  /////////////////////////Update User's(DateOfBirth,FirstName,LastName,Phone,Governorate)////////////////////
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("changeInfo").addEventListener("click", async function() {
  
      const DateOfBirth = document.getElementById("DateOfBirth").value.trim();
      const FirstName = document.getElementById("FirstName").value.trim();
      const LastName = document.getElementById("LastName").value.trim();
      const Phone = document.getElementById("Phone").value.trim();
      const Governorate = document.getElementById("Governorate").value.trim();

      const userData = {
        "DateOfBirth": DateOfBirth,
        "FirstName": FirstName,
        "LastName": LastName,
        "Phone": Phone,
        "Governorate": Governorate
      };

  const token = sessionStorage.getItem('token'); 
  const userId = sessionStorage.getItem('userID');
  try {
    const response = await fetch(`http://localhost:3000/User/ChangeUserInfo/${userId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `SAM ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();
    console.log(data);  

    if (data.message == "updated Successfully") {
      console.log("User updated successfully");
      alert("User updated successfully");
    }
    else{
    alert(data.message);
    }
  }
  catch (error) {
    console.error(error);
  }}
  ) 
  });


////////////////////////delete User's account(email,password,confirmpassword)////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form3");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    submitButton.disabled = true;

    const Email = document.getElementById("Email").value.trim();
    const Password = document.getElementById("Password").value.trim();
    const ConfirmPassword = document.getElementById("ConfirmPassword").value.trim();


    // Form validation
    if (Email === "" || Password === "" || ConfirmPassword === "") {
      alert("All fields are required");
      return;
    }

    if (Password !== ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      "Email": Email,
      "Password": Password,
      "ConfirmPassword": ConfirmPassword
    };

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error("Token not found in sessionStorage");
    }

    try {
      const response = await fetch("http://localhost:3000/User/DeleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `SAM ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log(data);

      if (data.message === "Deleted Successfully") {
        console.log("User Deleted successfully");
        alert("User Deleted successfully");
       logout();
      }
      if (data.message === "Invalid Email OR Password") {
        console.log("Invalid Email OR Password");
        alert("Invalid Email OR Password");
      }
    } catch (error) {
      console.error(error);
    }
    submitButton.disabled = false;
  });
});

///////////////////////////////Get User's information////////////////////
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('token') && sessionStorage.getItem('userID')) {
    getUserInfo();
  }

  async function getUserInfo() {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userID');
    try {
      const response = await fetch(`http://localhost:3000/User/GetUserInfo/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `SAM ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      const userInfo = data.UserInfo;

      document.getElementById('nameInfo').innerText = `${userInfo.FirstName} ${userInfo.LastName}`;
      document.getElementById('emailInfo').innerText = userInfo.Email;
      document.getElementById('phoneInfo').innerText = userInfo.Phone;
      document.getElementById('birthdateInfo').innerText = userInfo.DateOfBirth;
      document.getElementById('govInfo').innerText = userInfo.Governorate;

    } catch (error) {
      console.error(error);
    }
  }
});

////game ////////
// displayWord();
const words = [
  "sam", "analysis", "peanut","muse" , "queen",
  "system", "chair", "tale", "horse", "happy",
  "destination", "governorate", "plant", "raspberry", "purpose",
  "london", "apportionment", "music", "lemon", "mile",
  "coconut", "date", "happy", "cranberry", "vanilla",
  "beach", "windows", "computer", "museum", "foot"
];

const jumbledWords = words.map(word => shuffleWord(word));
let currentWordIndex = 0;

function displayWord() {  
  document.getElementById("word").textContent = jumbledWords[currentWordIndex];
}
let correctCount = 0;
let incorrectCount = 0;

function displayCounts() {
  document.getElementById("correctCount").textContent = `Correct: ${correctCount}`;
  document.getElementById("incorrectCount").textContent = `Incorrect: ${incorrectCount}`;

}

function checkSpelling() {
  const userInput = document.getElementById("userInput").value.trim().toLowerCase();
  const correctWord = words[currentWordIndex];

  if (userInput === correctWord) {
    document.getElementById("CorrectResult").textContent = "Correct!";
    document.getElementById("IncorrectResult").textContent = "";
    correctCount++; 
    currentWordIndex = (currentWordIndex + 1) % words.length;
      
      displayWord();
      displayCounts();
  }  
  if (userInput !== correctWord) {
    document.getElementById("IncorrectResult").textContent = "Incorrect. Try again!";
    document.getElementById("CorrectResult").textContent = "";
    incorrectCount++; 
    displayCounts();
  }
  document.getElementById("userInput").value = "";
}

function changeWord() {
  currentWordIndex = (currentWordIndex + 1) % words.length;
  jumbledWords[currentWordIndex] = shuffleWord(words[currentWordIndex]);
  displayWord();
  document.getElementById("IncorrectResult").textContent = "";
  document.getElementById("CorrectResult").textContent = "";
}

function shuffleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}
displayWord();

   /////size limit////
function limitLength(element) {
  if (element.value > 250) {
      element.value = 250;
  } else if (element.value.length > 3) {
      element.value = element.value.slice(0, 3);
  }
}

function myMenuFunction() {
  var i = document.getElementById("navMenu");
  if(i.className === "nav-menu") {
      i.className += " responsive";
  } else {
      i.className = "nav-menu";
  }
  
}

function openNav() {
  var sidebar = document.getElementById("mySidebar");
  if (sidebar.style.width === "200px") {
    closeNav();
  } else {
    sidebar.style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
  }
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function redirectToSettings() {
  const userID = sessionStorage.getItem('userID');
  if (!userID) {
    alert('User ID not found in sessionStorage');
    return;
  }
  const url = new URL('file:///D:/3rd%20year/web/Settings.html');
  url.searchParams.append('userID', userID);
  window.location.href = url.href;

}

function redirectToProfile() {
  const userID = sessionStorage.getItem('userID');
  if (!userID) {
    alert('User ID not found in sessionStorage');
    return;
  }
  const url = new URL('file:///D:/3rd%20year/web/profile.html');
  url.searchParams.append('userID', userID);
  window.location.href = url.href;

}

function redirectToBuyBoard() {
  const userID = sessionStorage.getItem('userID');
  if (!userID) {
    alert('User ID not found in sessionStorage');
    return;
  }
  const url = new URL('file:///D:/3rd%20year/web/Buy_board.html');
  url.searchParams.append('userID', userID);
  window.location.href = url.href;

}

function redirectToGame() {
  const userID = sessionStorage.getItem('userID');
  if (!userID) {
    alert('User ID not found in sessionStorage');
    return;
  }
  const url = new URL('file:///D:/3rd%20year/web/game.html');
  url.searchParams.append('userID', userID);
  window.location.href = url.href;
}

function redirectToDashboard() {
  const userID = sessionStorage.getItem('userID');
  if (!userID) {
    alert('User ID not found in sessionStorage');
    return;
  }
  const url = new URL('file:///D:/3rd%20year/web/dashboard.html');
  url.searchParams.append('userID', userID);
  window.location.href = url.href;

}

function redirectToHome() {
  const userID = sessionStorage.getItem('userID');
  if (!userID) {
    alert('User ID not found in sessionStorage');
    return;
  }
  const url = new URL('file:///D:/3rd%20year/web/home.html');
  url.searchParams.append('userID', userID);
  window.location.href = url.href;
 
}

function parseUserId(token) {
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  return payload.id;
}
