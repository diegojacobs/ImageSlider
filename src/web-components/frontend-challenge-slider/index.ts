import Style from "./style";
import BrowserHelper from "../../helpers/browser-helper";
import CustomElement from "../../core/custom-element";

export default class FrontendChallengeSlider extends CustomElement {
  private _index: number;
  private _timeoutId: NodeJS.Timeout | undefined;

  //- TAG --------------------------------------------------------------------------------------------------------------
  public static readonly TAG: string = "image-slider";
  public static create(): FrontendChallengeSlider {
    return document.createElement(FrontendChallengeSlider.TAG) as FrontendChallengeSlider;
  }

  //- Members ----------------------------------------------------------------------------------------------------------
  public isMobile = BrowserHelper.isBrowserMobile();

  //- Constructor ------------------------------------------------------------------------------------------------------
  constructor() {
    super();
    this._index = 0;
    this._timeoutId = undefined;
  }
  
  get images(): string[] {
    return this.hasAttribute('images') ? JSON.parse(this.getAttribute('images') || '[]') : [];
  }
  
  //- HTMLElemet interface implementation ------------------------------------------------------------------------------
  connectedCallback() {
    // Apply adopted style sheets found in 'style.module.css'
    this.applyAdoptedStyleSheets(Style);
    this.images;
    
    // Append HTML content
    const template = document.createElement('div');
    template.className = 'page-container'
    template.innerHTML = `
      <div id="media-slider-component" class="media-slider-component">
        ${this.images.map((image: string, index: number) => (`
            <div id="image-${index}" class="image-container fade">
              <img src="${image}" style="width:100%">
            </div>
          `)).join("")
      }
        <a id="prev-button" class="prev">&#10094;</a>
        <a id="next-button" class=" next">&#10095;</a>
        <div class="actions-container">
          <a id="full-screen-button" class="full-screen-button active">&#9974;</a>
          <a id="normal-screen-button" class="normal-screen-button">&#9587;</a>
          <a id="auto-play-button" class="auto-play-button">&#10148;</a>
          <a id="stop-button" class="stop-button">&#x25A0;</a>
        </div>
      </div>
      <br>
      <div style="text-align:center">
        ${this.images.map((image: string, index: number) => (`<span class="dot" data="${index}"></span>`)).join("")
        }
      </div>
    `;
    this.appendToShadowRoot(template);
    
    this.listenToPreviousButton();
    this.listenToNextButton();
    this.listenToAutoplayButton();
    this.listenToStopButton();
    this.listenToFullscreenButton();
    this.listenToExitFullscreenButton();
    this.initComponent();
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name: string, prev: string, value: string) {}

  static get observedAttributes() {
    return [];
  }

  initComponent = () => {
    this.showSlides();
    this.addAutomaticCycle();
  }

  showSlides = () => {
    const images = this.shadowRoot?.querySelectorAll(".image-container");
    const dots = this.shadowRoot?.querySelectorAll(".dot");

    images?.forEach((image: Element, i: number) => {
      if (i === this._index) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });

    dots?.forEach((dot: Element, i: number) => {
      if (i === this._index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  addAutomaticCycle = () => {
    const autoPlayButton = this.shadowRoot?.querySelector("#auto-play-button");
    const stopButton = this.shadowRoot?.querySelector("#stop-button");

    autoPlayButton?.classList.remove('active');
    stopButton?.classList.add('active');

    this._timeoutId = setInterval(() => {
      this.increaseIndex();
      this.showSlides();
    }, 5000);
  }

  removeAutomaticCycle = () => {
    const autoPlayButton = this.shadowRoot?.querySelector("#auto-play-button");
    const stopButton = this.shadowRoot?.querySelector("#stop-button");

    autoPlayButton?.classList.add('active');
    stopButton?.classList.remove('active');
    
    clearInterval(this._timeoutId);
  }

  listenToPreviousButton = () => {
    const prevButton = this.shadowRoot?.querySelector("#prev-button");
    prevButton?.addEventListener('click', () => {
      this.decreaseIndex();    
      this.showSlides();
    });
  }

  listenToNextButton = () => {
    const nextButton = this.shadowRoot?.querySelector("#next-button");
    nextButton?.addEventListener('click', () => {
      this.increaseIndex();
      this.showSlides();
    });
  }

  decreaseIndex = () => {
    this._index = this._index === 0 ? this.images.length - 1 : this._index - 1;
  }

  increaseIndex = () => {
    this._index = this._index === this.images.length - 1 ? 0 : this._index + 1;
  }

  listenToAutoplayButton = () => {
    const autoPlayButton = this.shadowRoot?.querySelector("#auto-play-button");
    autoPlayButton?.addEventListener('click', this.addAutomaticCycle);
  }

  listenToStopButton = () => {
    const stopButton = this.shadowRoot?.querySelector("#stop-button");
    stopButton?.addEventListener('click', this.removeAutomaticCycle);
  }

  listenToFullscreenButton = () => {
    const fullscreenButton = this.shadowRoot?.querySelector("#full-screen-button");
    fullscreenButton?.addEventListener('click', this.showSliderInFullScreen);
  }

  listenToExitFullscreenButton = () => {
    const exitFullscreenButton = this.shadowRoot?.querySelector("#normal-screen-button");
    exitFullscreenButton?.addEventListener('click', this.showSliderInNormalScreen);
  }

  showSliderInFullScreen = () => {
    const sliderComponent = this.shadowRoot?.querySelector("#media-slider-component");
    sliderComponent?.classList.add('full-width');

    const fullScreenButton = this.shadowRoot?.querySelector("#full-screen-button");
    const normalScreenButton = this.shadowRoot?.querySelector("#normal-screen-button");

    fullScreenButton?.classList.remove('active');
    normalScreenButton?.classList.add('active');
  }

  showSliderInNormalScreen = () => {
    const sliderComponent = this.shadowRoot?.querySelector("#media-slider-component");
    sliderComponent?.classList.remove('full-width');

    const fullScreenButton = this.shadowRoot?.querySelector("#full-screen-button");
    const normalScreenButton = this.shadowRoot?.querySelector("#normal-screen-button");

    fullScreenButton?.classList.add('active');
    normalScreenButton?.classList.remove('active');
  }
}

customElements.define(FrontendChallengeSlider.TAG, FrontendChallengeSlider);
