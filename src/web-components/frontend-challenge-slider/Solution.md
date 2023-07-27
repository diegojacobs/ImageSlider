# Solution

## 1. Web Component
  - The current solution give the ability to set full screen or to show the component in hardcoded width. 
  - It also has the feature to autoplay the images or to stop them and has the left and right arrows to go through all the images.
  - The images come as a property from the component.

  ### Things to improve
  -----
  - I would give a click action to the small dashes on the bottom so that the user can go directly to an image.
  - The dashes are not design for infinite images, so we should add some pagination to the dashes and only show a limit. (e.g 5)
  - The same for having a limit for images taht are loaded. The images are only loaded by 5 or by a number that the developer gives as a prop. If the user moves to a new page the new images are loaded.

## 2. UI/UX
-----
  My current solution is quite standard and easy to use and understand. 
  You have the left and right arrows to move through the images. You have in the part below the images the number of images you have and highlighted the current one. 

  ### Things to improve
  -----
  - The icons should be from an icno library so that all ahve the same size and not some unicode charachter which then wach has a different size.
  - Also choose modern icons so that they look more like icons in other sites.


## 3. Custom Attributes
  1. As mentioned before we can get a number as a prop that let us know how many iamges are we going to load. We can work this with pagination, the moment the user ask for a image that belongs to another page the new batch is loaded.
  2. Instead of receiving a list of strings we can receive a list of objects that contain the image url and the image thumbnail url for each image. The thumbnail would be shown instead of the dashes so taht the user can go see a small preview of the images. If the user goes through the thumbnails the image showing on top should not change until a new one is selected.
  3. This should just be a prop as a small flag to let the component know if it should continue sliding after it arrived to the last image or jsut stop.
  4. It is implemented. We can just add property so that the developer can set if by defualt it is on auto-play or not. Also if he wants to show or not the button to change this behaviour.
## 4. Stylable
  - I would give a json as a model that the developer can pass as a property to the component. In which the suer can set the icons for the arrows, for the auto-play, stop, full-width, etc. buttons. Set the color and position for each button and style it. It should also be posible to give the width and height of the component when not on full-size.

