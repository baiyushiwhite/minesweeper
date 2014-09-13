var MineSweeper = (function (window, document, $) {
	"use strict";

	var inner = {};

	var View = function (html) {
		var $html = $(html), self = this;

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
					$("<td></td>").appendTo(trElement).attr("row", i).attr("col", j);
				}
			}
			$html.find("#mineNum").html(boardConf.mineNum);
		};

		this.addMouseClickListener = function (leftClickHandler, rightClickHandler) {
			$html.find("#boardTable").find("td").mousedown(function (eva) {
				eva.preventDefault();
				if (eva.which === 1) {
					self.showBlankBlock($(this));
					leftClickHandler($(this).attr("row"), $(this).attr("col"));
					$(this).unbind(eva);
				} else if (eva.which === 3) {
					self.switchStampMineBlock($(this));
					rightClickHandler($(this).attr("row"), $(this).attr("col"));
				}
				eva.stopPropagation();
			});
		};

		this.showBlankBlock = function ($ele) {
			$ele.css("background-color", "white");
		};

		this.showMineNumBlock = function ($ele, mineNum) {
			$("<img src='images/"+ mineNum +".png'>").appendTo($ele).attr("width", "25px").attr("height", "25px");
		};

		this.switchStampMineBlock = function ($ele) {
			$("<img src='images/flag.png'>").appendTo($ele).attr("width", "25px").attr("height", "25px");
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
			while (minePositionList.length < currentBoard.mineNum) {
				var minePosition = Math.floor(Math.random() * currentBoard.row * currentBoard.col);
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
