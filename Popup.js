class Popup {
    constructor(data) {
        this.buttonsClass = data.buttonsClass;
        this.popupClass = data.popupClass;
        this.classClose = data.classClose;

        if (data.functionBeforeOpen) {
            this.functionBeforeOpen = data.functionBeforeOpen;

        }
        if (data.functionAfterClose) {
            this.functionAfterClose = data.functionAfterClose;
        }
        this.clickOpen();
        this.clickClose();
    }

    clickOpen() {
        for (let buttonClass of this.buttonsClass) {
            let buttons = document.querySelectorAll("." + buttonClass);
            for (let button of buttons) {
                button.addEventListener('click', (e) => {
                    let popups = document.querySelectorAll("." + this.popupClass);
                    for (let popup of popups) {
                        if (popup.classList.contains('active')) {
                            this.ClosePopup()
                            return;
                        }
                    }

                    this.open()
                })
            }
        }
    }

    clickClose() {
        let buttonsClose = document.querySelectorAll('.' + this.popupClass + ' .' + this.classClose);
        for (let buttonClose of buttonsClose) {
            buttonClose.addEventListener('click', (e) => {
                this.close()
            })
        }
    }

    open() {
        let popups = document.querySelectorAll("." + this.popupClass);

        for (let popup of popups) {

            if (this.functionBeforeOpen) {
                this.functionBeforeOpen(this);
            }

            popup.classList.add('active')
            setTimeout(() => [
                popup.classList.add('fade-in')
            ], 1);
        }
        this.bodyScroll(true)
    }

    close() {
        let popups = document.querySelectorAll("." + this.popupClass);

        for (let popup of popups) {

            if (this.functionAfterClose) {
                this.functionAfterClose(this)
            }
            popup.classList.remove('fade-in')
            setTimeout(() => {
                popup.classList.remove('active')
            }, 200)
        }
        this.bodyScroll(false)
    }

    bodyScroll(status = false) {
        let bodies = document.querySelectorAll("body");
        if (status) {
            for (let body of bodies) {
                body.classList.add('no-scroll')
            }
        } else {
            for (let body of bodies) {
                body.classList.remove('no-scroll')
            }
        }
    }
}
