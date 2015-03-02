var gallery = function() {

  var css = {
    ids: {
      galleryWrapper: "gallery-wrapper",
      thumbnailsWrapper: "thumbnails-wrapper",
      imagesWrapper: "images-wrapper",
      descriptionWrapper: "description-wrapper",
      title: "title",
      closeButton: "close-button",
      description: "description"
    }
  };

  var galleryWrapper = document.getElementById(css.ids.galleryWrapper);

  var removeImagesWrapperIfExist = function() {
    var imagesWrapper = document.getElementById(css.ids.imagesWrapper);
    if (imagesWrapper != null) galleryWrapper.removeChild(imagesWrapper);
  }

  var addImagesToWrapper = function(wrapper, images) {
    var image, lineBreak,
        i, length = images.length;
    for (i = 0; i < length; i++) {
      image = document.createElement("img");
      image.src = images[i];
      wrapper.appendChild(image);

      lineBreak = document.createElement("br");
      wrapper.appendChild(lineBreak);
    }
  }

  var createDivWithId = function(id) {
    var div = document.createElement("div");
    div.id = id;
    return div;
  }

  var createDescriptionWrapper = function(title, description) {
    var wrapper = createDivWithId(css.ids.descriptionWrapper);

    var closeButton = createDivWithId(css.ids.closeButton);
    closeButton.onclick = function() { removeImagesWrapperIfExist(); };
    wrapper.appendChild(closeButton);

    var titleBlock = createDivWithId(css.ids.title);
    titleBlock.innerHTML = title;
    wrapper.appendChild(titleBlock);

    if (description != null) {
      var descriptionBlock = createDivWithId(css.ids.description);
      descriptionBlock.innerHTML = description;
      wrapper.appendChild(descriptionBlock);
    }

    return wrapper;
  }

  var showImages = function(settings) {
    var name = settings.name,
        description = settings.description,
        images = settings.images;

    removeImagesWrapperIfExist();

    var imagesWrapper = createDivWithId(css.ids.imagesWrapper);

    var descriptionWrapper = createDescriptionWrapper(name, description);

    var image = document.createElement("img");
    image.src = images[0];
    image.onload = function() {
      descriptionWrapper.style.maxWidth = image.width + "px";
    };

    imagesWrapper.appendChild(descriptionWrapper);

    addImagesToWrapper(imagesWrapper, images);

    var thumbnailsWrapper = document.getElementById(css.ids.thumbnailsWrapper);
    galleryWrapper.insertBefore(imagesWrapper, thumbnailsWrapper);
  }

  var showImagesHelper = function(settings) {
    return function() {
      showImages(settings);
    }
  }

  var init = function() {
    var thumbnails = [],
        i, length = arguments.length;
    for (i = 0; i < length; i++) {
      var argument = arguments[i];

      thumbnails[i] = document.getElementById(argument.thumbnailId);
      thumbnails[i].onclick = showImagesHelper(argument);
      thumbnails[i].href = "#";
    }
  }

  return { init: init }
}();
