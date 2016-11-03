(function() {
    window.jeweleryModule = new function() {
        addWatermarkToImages('.clickable-small-image');
        jQuery(document).ready(function($) {
            $('#ImageSlider').length && $('#ImageSlider').sliderPro({
                buttons: false,
                arrows: true,
                width: 1200,
                height: 300
            });
        });

        this.onSmallImageClick = function(target) {
            var bigImageUrl = target.dataset.bigimageurl;
            if(bigImageUrl) {
                $('#BigImageContainer')[0].innerHTML += '<div class="big-image-container visible" id="BigImageWrapper">' +
                    '<div class="mask" onclick="jeweleryModule.onBigImageMaskClick()"></div>' +
                    '<img class="big-image" src="' + bigImageUrl + '"></div>';
                addWatermarkToImages('.big-image');
            }
        };


        this.onBigImageMaskClick = function() {
            getBigImageWrapper().parentNode.removeChild(getBigImageWrapper());
        };

        function addWatermarkToImages(selector) {
            $(selector).watermark({
                text: 'Гринин'
            });
        };
        function getBigImageWrapper() {
            return document.getElementById('BigImageWrapper');
        };
    }
})();