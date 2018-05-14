'use strict';

angular.module('mncalApp')
  .factory('Modal', function($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    /**
     * Opens a reserva modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openReservaModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/reservaModal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }
    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
let
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      },

      reserve: {
        create: function(created, hour, fecha) {
          created = created || angular.noop;
          return function() {
            var args = Array.prototype.slice.call(arguments)

            var modalReserva = openReservaModal({
              modal: {
                dismissable: true,
                text: 'Ingresa tu nombre y el curso que quieres reservar.',
                hour: args[0],
                fecha: args[1],
                profesor: undefined,
                curso: undefined,
                buttons: [{
                  classes: 'btn-default',
                  text: 'Cancelar',
                  click: function(e) {
                    modalReserva.dismiss(e);
                  }
                },
                {
                  classes: 'btn-primary',
                  text: 'Reservar',
                  click: function(m) {
                    modalReserva.close(m);
                  }
                }
                ]
              }
            }, 'modal-primary');

            modalReserva.result.then(function(event) {
              created.apply(event, args);
            });
          }
        }
      }
    };
  });
