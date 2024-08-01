// אתחל את ה-SDK של פייסבוק
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'YOUR_APP_ID',
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
    });
    FB.AppEvents.logPageView();
    getPageAds();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// בקש את המודעות של הדף
function getPageAds() {
    FB.api(
        '/{page-id}/promotable_posts',
        'GET',
        { access_token: 'PAGE_ACCESS_TOKEN' },
        function(response) {
            if (response && !response.error) {
                // עבד את הנתונים שהתקבלו
                displayAds(response.data);
            } else {
                console.error('Error fetching ads:', response.error);
            }
        }
    );
}

// הצג את המודעות ככרטיסיות בדף
function displayAds(ads) {
    const adsContainer = document.getElementById('ads-container');
    adsContainer.innerHTML = ''; // נקה את הקונטיינר לפני הצגת המודעות
    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.className = 'col-md-4';
        adElement.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${ad.message || 'No title'}</h5>
                    <p class="card-text">Posted on: ${new Date(ad.created_time).toLocaleString()}</p>
                </div>
            </div>
        `;
        adsContainer.appendChild(adElement);
    });
}
