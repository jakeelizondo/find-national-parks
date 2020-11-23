import $ from 'jquery';
('use strict');

function handleUserSubmit() {
  $('.search-parks').on('submit', (event) => {
    event.preventDefault();
    console.log('clicked to submit');

    let targetStates = $(event.currentTarget).find('#state-input').val();
    console.log(targetStates);

    let maxResults = Number(
      $(event.currentTarget).find('#max-result-input').val()
    );

    if (maxResults === 0) {
      maxResults = 10;
    }

    generateResults(targetStates, maxResults);
  });
}

function generateResults(targetStates, maxResults) {
  console.log('lets get results');
  const npBaseUrl = `https://developer.nps.gov/api/v1/parks?api_key=Qg4XTSJD3TaUpJjX3m1l9m2mnwEd3wsnTycxmL9C&stateCode=${targetStates}&limit=${maxResults}`;
  console.log(npBaseUrl);

  fetch(npBaseUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((error) => {
      console.log('Something went wrong', error);
    });
}

function displayResults(responseJson) {
  console.log('displaying results');

  $('.results-listings').empty();

  let parksList = responseJson.data.map((park) => {
    return `<h1>${park.fullName}</h1><a href="${park.url}">Visit the Park Website</a><p>${park.description}</p>`;
  });

  parksList = parksList.join('');
  console.log(parksList);
  $('.results-listings').html(parksList);
}

function main() {
  console.log('main is running');
  handleUserSubmit();
}

$(main);
