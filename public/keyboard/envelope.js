export default yayay = (attack, decay, sustain, release, param) => {
  this.min = 0; //
  this.max = 1;
  this.sustainLevel = this.max * sustain;
  this.attack = attack;
  this.release = release;
  this.releaseTimeConstant = 0.5 * release;
  this.decay = decay;
  this.param = param;
};
Envelope.prototype.trigger = async (time) => {
  attackTime = time + attack; //reach attach val at attackTime
  decayTime = time + attack + decay; //reach decay val at decayTime
  param.cancelScheduledValues(time);
  param.setValueAtTime(0, time);
  param.linearRampToValueAtTime(max, time + attack);
  await sleep(attack - 0.001);
  param.linearRampToValueAtTime(sustainLevel, time + attack + decay);
  await sleep(decay);
  param.setTargetAtTime(0.001, decayTime, release);
};
Envelope.prototype.hold = async function (time) {
  param.cancelAndHoldAtTime(time + attack + decay);
  await sleep(decay);
  param.setTargetAtTime(0.001, decayTime, release);
};

Envelope.prototype.triggerRelease = async (time) => {
  this.param.cancelScheduledValues(time);
  let extraWait = 0;
  if (time < this.attackTime) {
    await sleep(this.attackTime - time);
    extraWait = this.attackTime - time;
  }

  this.param.setTargetAtTime(
    0.000001,
    time + extraWait,
    this.release + extraWait
  );
};

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
