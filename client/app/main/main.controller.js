'use strict';

angular.module('mncalApp')
  .controller('MainCtrl', function($scope, $http, socket, Modal) {

    // --------------------
    var date = new Date();
    var mes = date.getMonth();
    var numDias = new Date(2018, mes + 1, 0).getDate();
    var days = [];

    for (var i = 1; i <= numDias; i++) {
      var dia = new Date(2018, mes, i).getDay()
      var fecha = new Date(2018, mes, i)

      if (dia != 6 && dia != 0) {
        days.push(fecha)
      }
    }

    var semanas = [];
    var array = [];

    days.map(function(dia) {
      array.push(dia);
      if (dia.getDay() == 5) {
        semanas.push(array);
        array = [];
      }
    })

    if (array.length != 0) {
      semanas.push(array);
      array = [];
    }

    var offset = [];

    semanas.map(function(semana) {
      for (i = 1; i <= 5; i++) {
        var a = semana.find(function(dia) {
          if (dia.getDay() == i) {
            return true;
          } else {
            return false;
          }
        })
        if (typeof a === 'undefined')
          array.push(null);
        else
          array.push(a);
      }
      offset.push(array);
      array = [];
    })

    var firstDay = offset[0].find(function(dia) {
      if (dia)
        return true
      else
        return false
    })

    var missing = [];

    for (i = 1; i <= firstDay.getDay() - 1; i++) {
      var d = new Date(firstDay);
      missing.push(new Date(d.setDate(d.getDate() - i)))
    }

    missing = missing.reverse();

    var firstWeek = missing.concat(offset[0]);

    firstWeek = firstWeek.filter(function(dia) {
      if (dia)
        return true
      else
        return false
    })

    offset[0] = firstWeek;

    missing = [];

    offset[4].reverse();

    var lastDay = offset[4].find(function(dia) {
      if (dia)
        return true
      else
        return false
    })

    for (i = 1; i <= 5 - lastDay.getDay(); i++) {
      d = new Date(lastDay);
      missing.push(new Date(d.setDate(d.getDate() + i)))
    }

    missing = missing.reverse();

    var lastWeek = missing.concat(offset[4]);

    lastWeek = lastWeek.filter(function(dia) {
      if (dia)
        return true
      else
        return false
    })

    lastWeek.reverse();

    offset[4] = lastWeek;

    semanas = offset;
    // ----------------------


    $scope.today = new Date();
    $scope.semanas = semanas;

    $scope.semanas.map(function(semana, i){
      semana.forEach(function(dia){
        if (dia.getDate() == $scope.today.getDate()){
         $scope.week = i
        }
      })
    });    

    $scope.hours = [1,2,3,4,5,6,7,8,9,10];

    $http.get('api/things/').then(function(response){
      $scope.reservas = response.data;
      socket.syncUpdates('thing',$scope.reservas);
    }); 

    $scope.fillReservas = function(hour,fecha){
      var r = $scope.reservas.find(function(reserva){
          return reserva.bloque == hour && new Date(reserva.fecha).getTime() == fecha.getTime()
      })
      return r
    }

    $scope.next = function(){
      $scope.week ++;
      if ($scope.week == 5){
        $scope.week = 0;
      }
    }

    $scope.previous = function(){
      if ($scope.week == 0){
        $scope.week = 5;
      }
      $scope.week--;
    }

     $scope.reservar = function(hour, fecha){

      var modal = Modal.reserve.create(function(){
        var reserva = {
          bloque: this.hour,
          fecha: this.fecha,
          profesor: this.profesor,
          curso: this.curso
        }

        $http.post('api/things/',reserva).then(function(response){
          console.log(response.data)
        })
      });
      
      modal(hour, fecha)
    }

    $scope.deleteReserva = function(id){
      $http.delete('api/things/'+ id);
    }

  });
