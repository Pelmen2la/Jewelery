angular.module('jeweleryApp', []);

(function() {
    window.jeweleryModule = new function() {
        this.onSmallImageClick = function(target) {
            var bigImageUrl = target.dataset.bigimageurl,
                img = getBigImageContainer().getElementsByTagName('IMG')[0];
            if(bigImageUrl) {
                getBigImageContainer().className += ' visible';
                img.setAttribute('src', bigImageUrl);
            }
        };


        this.onBigImageMaskClick = function(target) {
            getBigImageContainer().className = getBigImageContainer().className.split(' ')[0];
        };

        function getBigImageContainer() {
            return document.getElementById('BigImageContainer');
        };
    }
})();