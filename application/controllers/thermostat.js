'use strict';

var Thermostat = function() {
  this.DEFAULT_TEMP = 20;
  this.temperature = this.DEFAULT_TEMP;
  this.power_saver = false;
  this.MIN_TEMP = 10;
  this.MAX_TEMP = 32;
  this.PSM_ON_MAX = 25;
  this.PSM_OFF_MAX = 32;
  this.LOWEST = 18;
  this.HIGHEST = 25;
  this.GAUGE_INCREMENT = 14.25;
};

Thermostat.prototype.getCurrentTemperature = function() {
 return this.temperature;
};

Thermostat.prototype.increaseTemperature = function() {
  if ((this.temperature + 1) > this.MAX_TEMP){
    this.rangeAlert();
    throw("Temperature cannot rise above the maximum.")
  } else {
    this.temperature += 1;
    this.mercuryAlignment();
  }
};

Thermostat.prototype.rangeAlert = function() {
  if (this.isPowerSavingModeOn() == true){
      document.getElementById('#text-divs').style.color = 'red';
  }
}

Thermostat.prototype.decreaseTemperature = function() {
  if ((this.temperature - 1) < this.MIN_TEMP) {
    throw("The temperature cannot fall below the minimum.")
  } else {
    this.temperature -= 1;
  }
};

Thermostat.prototype.resetTemperature = function() {
  this.temperature = this.DEFAULT_TEMP;
  this.resetGauge();
};

Thermostat.prototype.resetGauge = function() {
  var reset = ((this.temperature / this.PSM_OFF_MAX) * 100)
  document.getElementById('mercury').style.height = reset + '%'
};

Thermostat.prototype.mercuryAlignment = function() {
  var merc = document.getElementById('mercury').style.height;
  var gauge = document.getElementById('temperature-gauge').clientHeight;
  if (parseInt(merc) > parseInt(gauge)) {
    merc = (gauge + 'px');
  }
}

Thermostat.prototype.powerSavingModeOn = function() {
  this.currentEnergyUsage();
  this.power_saver = true;
  this.MAX_TEMP = this.PSM_ON_MAX;
  this.temperature = this.PSM_ON_MAX;
  this.resetGauge();
};

Thermostat.prototype.powerSavingModeOff = function() {
  this.power_saver = false;
  this.MAX_TEMP = this.PSM_OFF_MAX;
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.power_saver;
};

Thermostat.prototype.currentEnergyUsage = function() {
  var current = this.temperature;
  if (current >= this.HIGHEST) {
    return('High')
  }
  if (current <= this.LOWEST) {
    return('Low')
  }
  else{
    return('Medium')
  }
};
