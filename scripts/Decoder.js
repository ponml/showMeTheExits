function Decoder(options) {
    var me = this;
    if(!options) {
      options = {};
    }

    me.url = options.url;

    if(!me.url) {
      throw "decoder needs a url";
    }
    

}

module.exports = Decoder;