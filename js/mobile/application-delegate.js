goog.provide('ian.mobile.ApplicationDelegate');

goog.require('goog.events.EventHandler');
goog.require('ian.ApplicationDelegate');


/**
 * @constructor
 * @extends {ian.ApplicationDelegate}
 * @param {!ian.Router} router A router.
 * @param {!ian.ServiceContainer=} services A service container to use
 *   for controller construction.
 * @param {Object.<string, *>=} cfg App configuration.
 */
ian.mobile.ApplicationDelegate = function (router, services, cfg) {
  this.root_view_ = null;

  ian.ApplicationDelegate.call(this, router, services, cfg);
};

goog.inherits(ian.mobile.ApplicationDelegate, ian.ApplicationDelegate);


/**
 * @param {ian.mobile.View} root_view The new root component.
 */
ian.mobile.ApplicationDelegate.prototype.setRootView = function (root_view) {
  this.root_view_ = root_view || null;
};


/**
 * @return {ian.mobile.View} The current root component.
 */
ian.mobile.ApplicationDelegate.prototype.getRootView = function () {
  return this.root_view_;
};



ian.mobile.ApplicationDelegate.prototype.beforeControllerChange =
    function (old_controller, new_controller) {
  if (old_controller && old_controller !== new_controller) {
    var current_view = old_controller.getView();
    if (current_view) {
      this.root_view_.removeSubview(current_view);
    }
  }
};

ian.mobile.ApplicationDelegate.prototype.afterControllerChange =
    function (old_controller, new_controller) {
  if (old_controller !== new_controller) {
    var view = new_controller.getView();
    if (view) {
      this.root_view_.addSubview(view);
    }
  }
};
