(function() {
    window.jeweleryModule = new function() {
        addWatermarkToImages('.clickable-small-image', 'small');
        jQuery(document).ready(function($) {
            $('#ImageSlider').length && $('#ImageSlider').sliderPro({
                buttons: false,
                arrows: true,
                width: 1200,
                height: 300,
                imageScaleMode: 'contain'
            });
        });

        this.onSmallImageClick = function(target) {
            var bigImageUrl = target.dataset.bigimageurl,
                description = (target.dataset.description || '').replace(/\n/g, '<br>');
                html = '<div class="product-info-wrapper ' + (description ? 'with-description' : '') + '" ' +
                    'onclick="jeweleryModule.hideFullscreenItem()">' +
                    '<img src="' + bigImageUrl + '">' +
                    (description ? '<p>' + description + '</p>' : '') +
                    '</div>',
                imageHtml = '<span><img class="big-image" src="' + bigImageUrl + '"></span>';
            if(bigImageUrl) {
                showFullscreenItem(html);
                addWatermarkToImages('.product-info-wrapper img', 'big');
            }
        };
        this.onVideoIconClick = function(videoUrl) {
            var videoId = videoUrl.split('?v=')[1];
            showFullscreenItem('<iframe src="https://www.youtube.com/embed/' + videoId + '"></iframe>');
        };
        this.hideFullscreenItem = function() {
            var wrapper = getFullscreenItemWrapper();
            wrapper.innerHTML = '';
            $(wrapper).removeClass('visible');
        };



        function addWatermarkToImages(selector, watermarkSize) {
            $(selector).watermark({
                path: '/resources/images/' + watermarkSize + 'watermark.png',
                opacity: 0.5
            });
        };
        function getFullscreenItemWrapper() {
            return document.getElementById('FullscreenItemWrapper');
        };
        function showFullscreenItem(itemHtml) {
            var wrapper = getFullscreenItemWrapper();
            wrapper.innerHTML = '<div class="mask" onclick="jeweleryModule.hideFullscreenItem()"></div>' + itemHtml;
            $(wrapper).addClass('visible');
        };
    }
})();