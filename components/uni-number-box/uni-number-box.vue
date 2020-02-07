<template>
	<view class="uni-numbox">
		<view class="uni-numbox__minus" :class="{'uni-numbox--disabled': disableSubtract}" @tap="decrementCartItemCount(_id)">-</view>
		<input class="uni-numbox__value" type="number" disabled :value="inputValue" @blur="_onBlur">
		<view class="uni-numbox__plus" :class="{'uni-numbox--disabled': disableAdd}" @tap="incrementCartItemCount(_id)">+</view>
	</view>
</template>
<script>
	import {mapActions} from 'vuex'
	export default {
		name: 'uni-number-box',
		props: {
			_id:{
				type:[Number, String],
				required: true
			},
			count: {
				type: Number,
				required:true,
				default: 1
			},
			min: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			inputValue(){
				return this.count
			},
			disableSubtract() {
				return this.inputValue <= this.min
			},
			disableAdd() {
				return this.inputValue >= this.max
			}
		},
	
		methods: {
			...mapActions( 'cart/', ['incrementCartItemCount', 'decrementCartItemCount']),
			
			_calcValue(type) {
				if (this.disabled) {
					return
				}
				const scale = this._getDecimalScale()
				let value = this.inputValue * scale
				let step = this.step * scale
				if (type === 'subtract') {
					value -= step
				} else if (type === 'add') {
					value += step
				}
				if (value < this.min || value > this.max) {
					return
				}
				this.inputValue = value / scale;
			},
	
			_onBlur(event) {
				let value = event.detail.value
				if (!value) {
					this.inputValue = 0
					return
				}
				value = +value;
				if (value > this.max) {
					value = this.max
				} else if (value < this.min) {
					value = this.min
				}
				this.inputValue = value
			}
		}
	}
</script>
<style lang="scss">
	$numbox-btn-width:70upx;
	$numbox-input-width:80upx;
	$numbox-height:70upx;
	$uni-font-size-xxl:40upx;
	$uni-text-color:#666666;
	$uni-border-color:#dadada;
	.uni-numbox {
		display: inline-flex;
		flex-direction: row;
		justify-content: flex-start;
		height: $numbox-height;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			transform-origin: center;
			box-sizing: border-box;
			pointer-events: none;
			top: -50%;
			left: -50%;
			right: -50%;
			bottom: -50%;
			border-radius: $uni-border-radius-lg;
			transform: scale(.5);
		}

		&__minus,
		&__plus {
			margin: 0;
			// background-color: $uni-bg-color-grey;
			background-color: #fff;
			width: $numbox-btn-width;
			font-size: $uni-font-size-xxl;
			height: 100%;
			line-height: $numbox-height;
			text-align: center;
			color: $uni-text-color;
			position: relative;
			border-radius: 100%;
			border: 1px solid $uni-border-color;
		}

		&__value {
			position: relative;
			// background-color: $uni-bg-color;
			background-color: #fff;
			width: $numbox-input-width;
			height: 100%;
			text-align: center;

			&:after {
				content: '';
				position: absolute;
				transform-origin: center;
				box-sizing: border-box;
				pointer-events: none;
				top: -50%;
				left: -50%;
				right: -50%;
				bottom: -50%;
				transform: scale(.5);
			}
		}

		&--disabled {
			color: $uni-text-color-disable;
		}
	}
</style>
