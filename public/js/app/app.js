angular.module('jeweleryApp', []);

(function() {
    window.jeweleryModule = new function() {
        addWatermarkToImages('.clickable-small-image');
        jQuery(document).ready(function($) {
            $('#ImageSlider').sliderPro({
                buttons: false,
                arrows: true
            });
        });

        this.onSmallImageClick = function(target) {
            var bigImageUrl = target.dataset.bigimageurl;
            if(bigImageUrl) {
                document.body.innerHTML += '<div class="big-image-container visible" id="BigImageContainer">' +
                    '<div class="mask" onclick="jeweleryModule.onBigImageMaskClick()"></div>' +
                    '<img class="big-image" src="' + bigImageUrl + '"></div>';
                addWatermarkToImages('.big-image');
            }
        };


        this.onBigImageMaskClick = function() {
            getBigImageContainer().parentNode.removeChild(getBigImageContainer());
        };

        function addWatermarkToImages(selector) {
            $(selector).watermark({
                text: 'Гринин'
            });
        };
        function getBigImageContainer() {
            return document.getElementById('BigImageContainer');
        };
    }
})();