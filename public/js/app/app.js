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
                showFullscreenItem('<img class="big-image" src="' + bigImageUrl + '"></div>');
                addWatermarkToImages('.big-image');
            }
        };
        this.onVideoIconClick = function(videoUrl) {
            var videoId = videoUrl.split('?v=')[1];
            showFullscreenItem('<iframe src="https://www.youtube.com/embed/' + videoId + '"></iframe>');
        };
        this.onFullscreenItemMaskClick = function() {
            hideFullscreenItem();
        };



        function addWatermarkToImages(selector) {
            $(selector).watermark({
                text: 'Гринин'
            });
        };
        function getFullscreenItemWrapper() {
            return document.getElementById('FullscreenItemWrapper');
        };
        function showFullscreenItem(itemHtml) {
            var wrapper = getFullscreenItemWrapper();
            wrapper.innerHTML = '<div class="mask" onclick="jeweleryModule.onFullscreenItemMaskClick()"></div>' + itemHtml;
            $(wrapper).addClass('visible');
        };
        function hideFullscreenItem() {
            var wrapper = getFullscreenItemWrapper();
            wrapper.innerHTML = '';
            $(wrapper).removeClass('visible');
        };
    }
})();