// Функция отрисовки отрезка методом ЦДА
function drawCDA() {
	/*
	pts - переменная, хранящая координаты двух точек
	returnPoints() - функция получения координат точек с холста
	*/
    var pts = returnPoints(2);
	//Если на холсте присутствуют 2 точки, то выполняется следующий блок:
    if (pts != null) {
		//xLen - переменная, хранящая длину проекции по оси Х
        var xLen = pts.x2 - pts.x1;
		//yLen - переменная, хранящая длину проекции по оси Y
        var yLen = pts.y2 - pts.y1;
		//maxProection - переменная, хранящая максимальную проекцию
        var maxProection = Math.max(Math.abs(xLen), Math.abs(yLen));
		//dx - переменная, хранящая приращение по оси Х
        var dx = xLen / maxProection;
		//dy - переменная, хранящая приращение по оси У
        var dy = yLen / maxProection;
		//х - х-координата точки
        var x = pts.x1 + 0.5;
		//y - y-координата точки
        var y = pts.y1 + 0.5;
		//map - переменная, хранящая координаты всех точек на холсте
        map = [];
		//steps - ссылка на компонент для вывода отладочной информации
		//steps.html() - очистка таблицы, содержащей отладочную информацию
        steps.html("");
		/*
		Добавление в таблицу, содержащую отладочную информацию, заголовка вида i-x-y-Point(x,y)
		*/
        appendRow("th", 4, 'i', 'x', 'y', 'Point(x,y)');
		/*
		Добавление в таблицу отладочной информации строки, содержащей текущие значения переменных
		*/
        appendRow("td", 4, "", "", "start", "(" + pts.x1 + ";" + pts.y1 + ")");
		//Цикл отрисовки отрезка
        for (var i = 0; i <= maxProection; i++) {
			//Округление координаты Х точки в меньшую сторону
            var resultX = Math.floor(x);
			//Округление координаты У точки в меньшую сторону
            var resultY = Math.floor(y);
			//Добавление в таблицу отладочной информации строки, содержащей текущие значения переменных
            appendRow("td", 4, i, x.toFixed(4), y.toFixed(4), "(" + resultX + ";" + resultY + ")");
			//Отрисовка точки по координатам Х и У
            drawPoint(resultX, resultY);
			//Вычисление новой координаты Х точки
            x += dx;
			//Вычисление новой координаты У точки
            y += dy;
        }
		//Добавление в таблицу отладочной информации строки, содержащей текущие значения переменных
        appendRow("td", 4, "", "", "end", "(" + pts.x2 + ";" + pts.y2 + ")");
        appendRow("th", 4, "", "dx", "dy", "length");
        appendRow("td", 4, "", dx.toFixed(2), dy.toFixed(2), maxProection);
    }
}

//Функция отрисовки отрезка алгоритмом Брезенхема
function drawBrez(brez_points) {

	var pts = [];
	var only_one = true;
    if (arguments.length < 1) pts = returnPoints(2);
	else {
		pts["x1"] = brez_points[0].x;
		pts["x2"] = brez_points[1].x;
		pts["y1"] = brez_points[0].y;
		pts["y2"] = brez_points[1].y;
		only_one = false;
	}

	//Если на холсте присутствуют 2 точки, то выполняется следующий блок:
    if (pts != null) {
	    //х - х-координата точки
        var x = pts.x1;
		//y - y-координата точки
        var y = pts.y1;
		//xLen - переменная, хранящая длину проекции по оси Х
        var xLen = pts.x2 - pts.x1;
		//yLen - переменная, хранящая длину проекции по оси Y
        var yLen = pts.y2 - pts.y1;
		//dx - переменная, хранящая модуль длины проекции по оси X
        var dx = Math.abs(xLen);
		//dy - переменная, хранящая модуль длины проекции по оси Y
        var dy = Math.abs(yLen);
		//signX - переменная, хранящая знак четверти
        var signX = Math.sign(xLen);
		//signX - переменная, хранящая знак четверти
        var signY = Math.sign(yLen);
		//reverse - переменная, определяющая максимальную из двух проекций по осям Х и У
        var reverse = dy > dx;
		//Если максимальная проекция по оси У, то меняем приращение
        if (reverse) {
            var temp = dx; dx = dy; dy = temp;
        }
		//е - переменная, хранящая значение ошибки
        var e = 2 * dy - dx;
		//map - переменная, хранящая координаты всех точек на холсте
        map = [];
		//steps - ссылка на компонент для вывода отладочной информации
		//steps.html() - очистка таблицы, содержащей отладочную информацию
        steps.html("");
		//Добавление в таблицу, содержащую отладочную информацию, заголовка вида i-e-x-y-e'-Point(x,y)
        if (only_one) appendRow("th", 6, 'i', 'e', 'x', 'y', "e'", 'Point(x,y)');
		//Добавление в таблицу отладочной информации строки, содержащей текущие значения переменных
        if (only_one) appendRow("td", 6, "", "", "", "", "start", "(" + pts.x1 + ";" + pts.y1 + ")");
        if (only_one) appendRow("td", 6, 0, "", pts.x1, pts.y1, e, "(" + pts.x1 + ";" + pts.y1 + ")");
		//Отрисовка начальной точки отрезка
        drawPoint(x, y);
		//Цикл отрисовки отрезка
        for (var i = 1; i <= dx; i++) {
			//oldE - переменная, хранящая предыдущее значение ошибки
            var oldE = e;
			//Условие выполнения, если значение ошибки больше нуля
            if (e >= 0) {
				//Если проекция по оси Х имеет длину большую чем по У, то увеличиваем х
                if (reverse) x += signX;
				//Иначе увеличиваем у
                else y += signY;
				//Пересчет значения ошибки
                e -= 2 * dx;
            }
			//Если проекция по оси Х имеет длину большую чем по У, то увеличиваем y
            if (reverse) y += signY;
			//Иначе увеличиваем х
            else x += signX;
			//Пересчет значения ошибки
            e += 2 * dy;
			//Добавление в таблицу отладочной информации строки, содержащей текущие значения переменных
            if (only_one) appendRow("td", 6, i, oldE, x, y, e, "(" + x + ";" + y + ")");
			//Отрисовка точки с полученными координатами
            drawPoint(x, y);
        }
		//Добавление в таблицу отладочной информации строки, содержащей текущие значения переменных
        if (only_one) appendRow("td", 6, "", "", "", "", "end", "(" + pts.x2 + ";" + pts.y2 + ")");
        if (only_one) appendRow("th", 6, "", "", "", "dx", "dy", "");
        if (only_one) appendRow("td", 6, "", "", "", dx.toFixed(2), dy.toFixed(2), "");
    }
}
//Отрисовка отрезка сглаженного влгоритмом Ву
function drawWu() {
	/*
	pts - переменная, хранящая координаты двух точек
	returnPoints() - функция получения координат точек с холста
	*/
    var pts = returnPoints(2);
	//Если на холсте присутствуют 2 точки, то выполняется следующий блок:
    if (pts != null) {
		//x1, y1, x2, y2 - координаты двух точке
        var x1 = pts.x1, x2 = pts.x2;
        var y1 = pts.y1, y2 = pts.y2;
		//dx - длина проекции по оси Х
        var dx = x2 - x1;
		//dy - длина проекции по оси У
        var dy = y2 - y1;
		/*
		swapAxes - переменная, определяющая, был ли произведен обмен осями
		swapAxes = true, при условии, что длина проекции по оси У больше длины проекции по оси Х
		*/
        var swapAxes = Math.abs(dx) < Math.abs(dy);
		/*
		Если длина проекции по оси У больше длины проекции по оси Х, то необходимо выбирать дополнительный
		пиксель выше или ниже основного, иначе - слева или права от основного. Для этого производится 
		обмен осями для выбора приращения следующей координаты пикселями.
		*/
        if (swapAxes) {
            var t = x1; x1 = y1; y1 = t;
            t = x2; x2 = y2; y2 = t;
            t = dx; dx = dy; dy = t;
        }
		//Определение координаты точки лежащей левее относительно другой точки на координатной оси.
        if (x2 < x1) {
            t = x1; x1 = x2; x2 = t;
            t = y1; y1 = y2; y2 = t;
        }
		//de - переменная, определяющая приращение ошибки
        var de = dy / dx;
		//ystart - у-координата начальной точки
        var ystart = y1 + de * (Math.round(x1) - x1);
		//Вычисление начального значения ошибки
        var e = ystart + de; 
		//Цикл отрисовки отрезка
        for (x = Math.round(x1) + 1; x <= Math.round(x2) - 1; x++) {
			//ipa - переменная, хранящая значение целой части ошибки
            var ipa = ipart(e);
			/*
			rfpart() - функция нахождения разности единицы и дробной части числа
			fpart() - функция определения дробной части числа
			drawPontBrighter() - функция отрисовки пикселя с заданной яркостью
			*/
            drawPointBrighter(swapAxes, x, ipa, rfpart(e));
            drawPointBrighter(swapAxes, x, ipa + 1, fpart(e));
			//Пересчет значения ошибки
            e = e + de;
        }
    }
}