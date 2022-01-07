const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type),
  //Создаем функцию, которая будет принимать запрашиваемый тип данных и введенные значения. Функция возвращает массив со значениями, тип которых совпадает с заданным.
  hideAllResponseBlocks = () => {
    //создаем функцию hideAllResponseBlocks
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );
    ///создаем массив из элементов из div c классом dialog__response-bloc
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
    //скрываем все элементы массива responseBlocksArray
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //создаем функцию showResponseBlock, которая принимает 3 параметра
    hideAllResponseBlocks();
    //выполняем функцию hideAllResponseBlocks, чтобы скрыть все блоки
    document.querySelector(blockSelector).style.display = "block";
    //отображаем блок, который был передан в функцию
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
      //если в функцию передан spanSelector, то его свойству textContent присваиваем msgText
    }
  },
  showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  // определяем функцию, которая будет отображать блок для вывода ошибок и выводить в span с классом #error сообщение об ошибке msgText
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  // определяем функцию, которая будет отображать блок для вывода результата и выводить в span с классом #ok сообщение msgText
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  // определяем функцию, которая будет отображать блок отсутствия результата

  tryFilterByType = (type, values) => {
    //определяем функцию tryFilterByType, которая принимает 2 параметра
    try {
      //создаем конструкцию try-catch
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      //создаем строку из значений массива, который вернула функция filterByType, с разделителем ", "

      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      // если длина строки определена, то выводим результат с данными, а иначе сообщение об отсутствии данных такого типа
      showResults(alertMsg);
      //выполняем функцию showResults для вывода результата
    } catch (e) {
      showError(`Ошибка: ${e}`);
      //в случае ошибки выполняем функцию showError
    }
  };

const filterButton = document.querySelector("#filter-btn");
//записываем в переменную элемент со страницы с классом #filter-btn

filterButton.addEventListener("click", (e) => {
  //навешиваем на элемент filterButton обработчик события click
  const typeInput = document.querySelector("#type");
  //записываем в переменную элемент со страницы с классом #type
  const dataInput = document.querySelector("#data");
  //записываем в переменную элемент со страницы с классом #data
  if (dataInput.value === "") {
    //если ничего не введено
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    //выводим подсказку
    showNoResults();
    //выполняем функцию showNoResults, которая выводит сообщение об отсутствии результата
  } else {
    dataInput.setCustomValidity("");
    //очищаем сообщение об ошибке
    e.preventDefault();
    //останавливаем стандартное выполнение события
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
    //выполняем функцию tryFilterByType. В параметры передаем значения у которых удалены пробельные символы с начала и конца строки
  }
});
