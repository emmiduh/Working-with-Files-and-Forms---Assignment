const form = document.getElementById('userForm');
const errorMessages = document.getElementById('errorMessages');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const otherNames = document.getElementById('otherNames').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const gender = document.getElementById('gender').value;

  let errorMessage = '';

  if (!firstName || !lastName) {
    errorMessage += 'First Name and Last Name are required. <br>';
  } else if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
    errorMessage += 'Names cannot contain numbers. <br>';
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errorMessage += 'Please enter a valid email address. <br>';
  }

  if (phone.length !== 11) {
    errorMessage += 'Phone number must be 11 digits. <br>';
  }

  if (!gender) {
    errorMessage += 'Please select your gender. <br>';
  }

  if (errorMessage) {
    errorMessages.innerHTML = errorMessage;
  } else {
    const data = {
      firstName,
      lastName,
      otherNames,
      email,
      phone,
      gender,
    };
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  
        const fileName = 'database.json';
  
        window.requestFileSystem(window.TEMPORARY, 1, (fs) => {
          fs.root.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
            fileEntry.createWriter((fileWriter) => {
              fileWriter.onwriteend = function(e) {
                console.log('Data saved to', fileName);
              };
              fileWriter.onerror = function(e) {
                console.error('Error saving data:', e);
              };
              const writerBlob = new Blob([blob], { type: 'application/json' });
              fileWriter.write(writerBlob);
            });
          }, (error) => {
            console.error('Error creating file:', error);
          });
        }, (error) => {
          console.error('Error requesting file system:', error);
        });
      } else {
        console.error('File System API not supported');
      }
    }
  });