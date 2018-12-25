/* Modal Class  */ 
var Modal = function($modalId) {
    this.domModal = $('#' + $modalId);
    this.scrollType = this.domModal.data('prop');
    this.btnClose = this.domModal.find('.modal-header .close');
    this.btnCancle = this.domModal.find('.modal-footer .cancle');
}

Modal.prototype = {
    showModal : function(){
        var self = this;
        var html = '<div class="modal-backdrop"></div>';
        this.domModal.prepend(html);
        //
        this.btnClose.click(function(event) {
            self.hideModal();
        });
        this.btnCancle.click(function(event) {
            self.hideModal();
        });
        //
        this.setBodyScroll(false);
        //
        this.domModal.show();
        //
        this.setToCenter();        
    },

    hideModal : function(){
        var domModalBackDrop = this.domModal.find('.modal-backdrop');
        domModalBackDrop.remove();
        this.domModal.hide();
        this.btnClose.off('click');
        this.btnCancle.off('click');
        this.btnClose = null;
        this.setBodyScroll(true);
        this.domModal = null;
        return false;
    },

    setToCenter : function(){
        var domModalDialog = this.domModal.find('.modal-dialog');
        var xPos = 0;
        var yPos = ($(window).height() - domModalDialog.height())/2;
        domModalDialog.css({"top": yPos + "px", "left" : xPos + "px"});
    },

    setBodyScroll : function($enable){
        if($enable){
            this.domModal.unbind('touchmove');
        }else{
            var self = this;
            //
            if(self.scrollType == 'scroll'){
                var domModalBody = this.domModal.find('.modal-body');
                domModalBody.addClass('scroll');
                var maxHeight = this.domModal.data('bodyheight');
                // console.log('maxHeight:' + maxHeight)
                if(maxHeight){
                    domModalBody.css('max-height', maxHeight + 'px' );
                }                
            }
            //
            this.domModal.on('touchmove', function(e){
                if(self.scrollType == 'scroll'){
                    if(!$('.modal-body').has($(e.target)).length){
                        e.preventDefault();
                    }
                }else if(self.scrollType == 'normal'){
                    e.preventDefault();
                }else{
                    e.preventDefault();
                }
                
            });
        }
    },

    setMsg: function ($msg) {
        this.msg = $msg;
    },

    getMsg : function(){
        return this.msg;
    }
}
/* Modal Class :: End  */ 

/* ModalForm Class :: Inherit Modal-Class, Add Form Value CallBack */ 
var ModalForm = function ($modalId, $callback) {
    // Call the parent's constructor 作用等同于 super() 父类构造函数
    Modal.call(this, $modalId);
    //
    this.btnConfirm = this.domModal.find('.modal-footer .confirm');
    this.textAreaDom = this.domModal.find('.control-text');
    this.initEvent($callback);
}
//* Inheritance :: Base-Class
ModalForm.prototype = new Modal();

//
ModalForm.prototype.initEvent = function ($callback) {
    var self = this;
    this.btnConfirm.click(function(event) {
        self.confirm($callback);
    });
}

ModalForm.prototype.confirm = function ($callback){
    $callback(this.textAreaDom.val());
    this.hideModal();
}

ModalForm.prototype.hideModal = function(){
    // Call the parent's public 作用等同于 super() 父类公共函数
    Modal.prototype.hideModal.call(this);
    //
    this.btnConfirm.off('click');
    this.textAreaDom.val('');
    this.btnConfirm = null;
    this.textAreaDom = null;
}
/* ModalForm Class :: End */ 