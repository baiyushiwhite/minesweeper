var MineSweeper = (function (window, document, $) {
	"use strict";

	var inner = {};

	var View = function (html) {
		var $html = $(html);

		this.addGameStartListener = function (handler) {
			$html.find("#startBtn").click(function (eva) {
				eva.preventDefault();
				handler();
			});
		};

		this.getLevel = function () {
			return $html.find("#levelSelector").val();
		};

		this.initBoard = function (boardConf) {
			$html.find("#mineBoard").empty();
			var tableElement = $("<table id='boardTable' cellspacing='0' cellpadding='0'></table>").appendTo($html.find("#mineBoard"));
			for (var i = 0; i < boardConf.row; i++) {
				var trElement = $("<tr></tr>").appendTo(tableElement);
				for (var j = 0; j < boardConf.col; j++) {
					var tdElement = $("<td row=" + i +" col=" + j + "></td>").appendTo(trElement);
				}
			}
			$html.find("#mineNum").html(boardConf.mineNum);
		};

		this.addMouseClickListener = function (leftClickHandler, rightClickHandler) {
		};
	};

	var Service = function () {
		var confTable = [
			{
				row: 9,
				col: 9,
				mineNum: 10,
			}, 
			{
				row: 16,
				col: 16,
				mineNum: 40,
			}, 
			{
				row: 16,
				col: 30,
				mineNum: 99,
			}, 
		], currentBoard;

		this.getBoardConf = function (level) {
			currentBoard = confTable[level];
			return currentBoard;
		};

		this.initCurrentBoard = function () {
			var minePositionList = [];
			while (minePositionList.length < boardConf.mineNum) {
				var minePosition = Math.floor(Math.random() * boardConf.row * boardConf.col);
				if (minePositionList.indexOf(minePosition) < 0) {
					minePositionList.push(minePosition);
				}
			}
			currentBoard.minePositionList = minePositionList;
		};
	};

	var Presenter = function (view, service) {
		function startGame() {
			var level = view.getLevel();
			view.initBoard(service.getBoardConf(level));
			service.initCurrentBoard();
			view.addMouseClickListener(showBlockInfo, stampBlock);
		};

		function showBlockInfo(row, col) {
		}

		function stampBlock(row, col) {
		}

		function init() {
			view.addGameStartListener(startGame);
		};

		init();
	};

	inner.View      = View;
	inner.Presenter = Presenter;
	inner.Service   = Service;

	return inner;
})(window, document, jQuery);

$(document).ready(function () {
	var view      = new MineSweeper.View("#mineSweeper");
	var service   = new MineSweeper.Service();
	var presenter = new MineSweeper.Presenter(view, service);
});
