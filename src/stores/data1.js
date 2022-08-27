import { uid } from 'quasar'

const errors = [
	{
		id: '0',
		label: 'Web-client',
		avatar: '/img/wc.svg',
		header: 'root',
		children: [
			{
				id: uid(),
				label: 'Войдет в следующую версию',
				children: [
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						id: uid(),
						children: [{ label: 'ERR-2514', body: 'story', story: 'Ошибка при обновлении ВК' }],
					},
				],
			},
			{
				id: '1',
				label: '5.5.5957.274',
				children: [
					{
						id: uid(),
						label: 'Функциональные изменения',
						icon: 'mdi-briefcase-outline',
						children: [],
					},
					{
						id: uid(),
						label: 'Оптимизации',
						icon: 'mdi-rocket-launch',
						children: [],
					},
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						children: [
							{
								id: uid(),
								label: 'ERR-2464',
								story:
									'ЭУ Записи справочника сотрудников. При поиске сотрудника возникает ошибка SQLFailure.',
							},
							{
								id: uid(),
								label: 'ERR-958',
								story:
									'В превью отображается содержимое файла если у пользователя запрещено чтение файла по ролевой.',
							},
							{
								id: uid(),
								label: 'ERR-2440',
								story: 'Ломается разметка окна поиска у папки "Поиск квартальных целей".',
							},
							{
								id: uid(),
								label: 'ERR-896',
								story:
									'Нет возможности переопределить обработчик LifeCycle в InitializeContainer серверного расширения.',
							},
							{
								id: uid(),
								label: 'ERR-2346',
								story: 'Отсутствие иконки (решения) при делегировании с возвратом.',
							},
							{
								id: uid(),
								label: 'ERR-2390',
								story: 'Комментарий от делегата отображается неправильно в ходе согласования.',
							},
							{
								id: uid(),
								label: 'ERR-2279',
								story: 'Игнорируется пропуск этапов после запуска согласования.',
							},
							{ id: uid(), label: 'ERR-0004', story: 'Ошибка контрола файла согласования.' },
							{
								id: uid(),
								label: 'ERR-2336',
								story: 'Не копируются операции при копировании разметок.',
							},
							{
								id: uid(),
								label: 'ERR-2183',
								story:
									'В заданиях не отображается ссылка на основной документ если задания созданы из другого задания КС.',
							},
							{
								id: uid(),
								label: 'ERR-2281',
								story:
									'Если офлайн пользователи не убираются из списка задач на пересчет в worker-e, то у онлайн пользователей перестают работать счетчики в папке.',
							},
							{
								id: uid(),
								label: 'ERR-2222',
								story: 'Текст метки ЭУ переносится на новую строку справа от метки.',
							},
						],
					},
				],
			},
			{
				id: '2',
				label: '5.5.5957.250',
				children: [
					{
						id: uid(),
						label: 'Функциональные изменения',
						icon: 'mdi-briefcase-outline',
						children: [],
					},
					{
						id: uid(),
						label: 'Оптимизации',
						icon: 'mdi-rocket-launch',
						children: [],
					},
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						children: [
							{
								id: uid(),
								label: 'ERR-2174',
								story: 'Календарь по умолчанию не учитывается при расчёте сроков.',
							},
							{
								id: uid(),
								label: 'ERR-1630',
								story:
									'Ошибочно срабатывает запрет на создания карточки при создании связанной карточки.',
							},
							{
								id: uid(),
								label: 'ERR-1840',
								story: 'Не открывается xlsx файл в "ход согласования".',
							},
							{
								id: uid(),
								label: 'ERR-1276',
								story:
									'При копировании разметки в другое решение частично сбрасываются операции редактирования.',
							},
							{
								id: uid(),
								label: 'ERR-1757',
								story:
									'Ошибка при поиске сотрудника в контроле StaffDirectoryItems, если в имени организации присутствует символ &.',
							},
							{
								id: uid(),
								label: 'ERR-1857',
								story: 'Не добавляются старые групповые операции в новый грид.',
							},
							{
								id: uid(),
								label: 'ERR-2094',
								story: 'Не отображается архивное задание в таблице исполнения карточки документа.',
							},
							{
								id: uid(),
								label: 'ERR-2111',
								story:
									'Нет возможности пропускать все внешние ресурсы при конвертации файлов при предпросмотре.',
							},
							{
								id: uid(),
								label: 'ERR-2102',
								story:
									'IFileConvertationService должен поддерживать использование клиентских конвертеров.',
							},
							{
								id: uid(),
								label: 'ERR-2060',
								story:
									'В справочнике сотрудников не отображаются колонки ФИО, Фамилия, Имя, Отчество.',
							},
							{
								id: uid(),
								label: 'ERR-2095',
								story: 'Корень WebFrame. Не работает условие роли для отображения разметки.',
							},
							{
								id: uid(),
								label: 'ERR-2030',
								story:
									'Uncaught TypeError: Cannot read properties of null (reading "storyContent") при наличии файла, недоступного для предпросмотра среди основных файлов в задании на согласование.',
							},
							{
								id: uid(),
								label: 'ERR-1829',
								story:
									'Не отображается задание в таблице исполнения документа, если документ добавлен в архив.',
							},
							{
								id: uid(),
								label: 'ERR-2086',
								story:
									'Предпросмотр разных версий файла в FileList показывает только первую версию документа.',
							},
						],
					},
				],
			},

			{
				id: '3',
				label: '5.5.5957.226',
				children: [
					{
						id: uid(),
						label: 'Функциональные изменения',
						icon: 'mdi-briefcase-outline',
						children: [],
					},
					{
						id: uid(),
						label: 'Оптимизации',
						icon: 'mdi-rocket-launch',
						children: [],
					},
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						children: [
							{
								id: uid(),
								label: 'ERR-2085',
								story:
									'Старый грид. Не работает настройка группировки представления "показывать раскрытой".',
							},
							{
								id: uid(),
								label: 'ERR-2028',
								story:
									'Текст одного сотрудника накладывается на текст другого при настройке этапа согласование, если настроено собственное отображение сотрудников.',
							},
							{
								id: uid(),
								label: 'ERR-2073',
								story:
									'Неверная сортировка папок в боковом меню. Папки с вложениями имеют приоритет при сортировке.',
							},
							{
								id: uid(),
								label: 'ERR-2036',
								story: 'Не происходит выравнивание текста по правому краю.',
							},
							{
								id: uid(),
								label: 'ERR-2003',
								story:
									'В этапе невозможно изменять параметры если согласующие вычисляются через бизнес-процесс..',
							},
							{
								id: uid(),
								label: 'ERR-1997',
								story:
									'В созданных вручную этапах нет возможности выполнять подписание простой подписью.',
							},
							{
								id: uid(),
								label: 'ERR-1829',
								story:
									'Не отображается содержимое вкладки "Исполнение" в карточке резолюции после архивирования карточки.',
							},
							{
								id: uid(),
								label: 'ERR-1842',
								story: 'Не работает группировка в новом гриде для числовых колонок.',
							},
							{
								id: uid(),
								label: 'ERR-1880',
								story: 'В контроле StaffDirectoryItems не очищается предыдущее значение.',
							},
							{
								id: uid(),
								label: 'ERR-1863',
								story:
									'Не сохраняются данные элемента управления Записи справочника сотрудников, если несколько элементов данного типа были связаны с одной секцией карточки.',
							},
							{
								id: uid(),
								label: 'ERR-1804',
								story: 'Сортировка файлов из нескольких источников в пределах одной веб-страницы.',
							},
							{
								id: uid(),
								label: 'ERR-1808',
								story: 'В событии cardSaved не передаются bindings.',
							},
							{ id: uid(), label: 'ERR-1630', story: 'Запрет создания карточки.' },
							{
								id: uid(),
								label: 'ERR-1572',
								story: 'Изменение формата даты в виджете последних карточек.',
							},
							{
								id: uid(),
								label: 'ERR-1566',
								story: 'Ошибка при генерации номера документа : Internal Server Error.',
							},
						],
					},
				],
			},
			{
				id: '4',
				label: '5.5.5957.195',
				children: [
					{
						id: uid(),
						label: 'Функциональные изменения',
						icon: 'mdi-briefcase-outline',
						children: [],
					},
					{
						id: uid(),
						label: 'Оптимизации',
						icon: 'mdi-rocket-launch',
						children: [],
					},
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						children: [
							{
								id: uid(),
								label: 'ERR-1795',
								story: 'При редактировании через WebDav временный файл пишется прямо на диск C..',
							},
							{
								id: uid(),
								label: 'ERR-1694',
								story:
									'FilePicker. Есть возможность удалить файл даже если установлен режим редактирования "Без редактирования".',
							},
							{
								id: uid(),
								label: 'ERR-1639',
								story: 'Ошибка internal Server Error при отмене создания задания на исполнение.',
							},
							{
								id: uid(),
								label: 'ERR-1673',
								story:
									'В окне параметров поиска в поле текущее время отображается время разметки из кэша.',
							},
							{
								id: uid(),
								label: 'ERR-1682',
								story:
									'В историю добавляется запись об изменении значения в контроле Dropdown при сохранении карточки, тогда как фактически значение не менялось..',
							},
							{
								id: uid(),
								label: 'ERR-1746',
								story: 'Форма просмотра. Отображение флагов не отцентрировано по метке..',
							},
							{
								id: uid(),
								label: 'ERR-1050',
								story:
									'Ошибка при открытии модального окна настройки прав доступа в справочнике сотрудников.',
							},
							{
								id: uid(),
								label: 'WebC-10823',
								story: '"Режим отложенных изменений уже включен." при установке флага.',
							},
							{
								id: uid(),
								label: 'ERR-1669',
								story: 'Не добавляется ссылка на файл в контроле PartnersDepartment.',
							},
							{
								id: uid(),
								label: 'ERR-1360',
								story:
									'после удаления ссылки и последующем выборе "пустой ссылки" добавляется значение удаленной ссылки.',
							},
							{
								id: uid(),
								label: 'ERR-1532',
								story:
									'Отключенные папки из боковой панели продолжают отображаться в панели после обновления страницы.',
							},
							{ id: uid(), label: 'ERR-1352', story: 'ЭП накладывается вертикально.' },
							{
								id: uid(),
								label: 'ERR-1051',
								story:
									'Ошибка при открытии модального окна настройки прав доступа в справочнике сотрудников.',
							},
							{
								id: uid(),
								label: 'ERR-1529',
								story: 'Ошибка при попытке добавления файла через контрол FilePicker.',
							},
							{
								id: uid(),
								label: 'ERR-1260',
								story:
									'Нельзя создать сотрудника или отредактировать поля у уже созданного в Справочнике сотрудников.',
							},
						],
					},
				],
			},
			{
				id: '5',
				label: '5.5.5957.174',
				children: [
					{
						id: uid(),
						label: 'Функциональные изменения',
						icon: 'mdi-briefcase-outline',
						children: [],
					},
					{
						id: uid(),
						label: 'Оптимизации',
						icon: 'mdi-rocket-launch',
						children: [],
					},
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						children: [
							{ id: uid(), label: 'ERR-1356', story: 'TextArea HtmlEditor автоматический Scroll.' },
							{
								id: uid(),
								label: 'ERR-1421',
								story: 'Ошибка "NullReferenceException" в StaffDirectoryItems.',
							},
							{
								id: uid(),
								label: 'ERR-1286',
								story: 'При отмене согласования в истории карточки нет соответствующей записи.',
							},
							{
								id: uid(),
								label: 'WebC-11062',
								story: 'Блок с файлом отчета по умолчанию отображается свёрнутым.',
							},
							{
								id: uid(),
								label: 'ERR-1218',
								story:
									'После создания новой версии файла до обновления страницы по умолчанию отображается старая версия файла.',
							},
							{
								id: uid(),
								label: 'ERR-1230',
								story:
									'Не сохраняются данные в контроле после перехода с Web-клиента 14 на Web-клиент 16.',
							},
							{
								id: uid(),
								label: 'ERR-1314',
								story: 'Недоступная для выбора организация, доступна в StaffDirectoryItems.',
							},
							{
								id: uid(),
								label: 'ERR-1261',
								story: 'В истории карточки не фиксируется операция "Создать согласование".',
							},
							{
								id: uid(),
								label: 'ERR-1290',
								story:
									'В поле атрибутивного поиска Автор = Я отображается не текущий пользователь, а предыдущий пользователь под которым был логин в Web-клиенте.',
							},
							{
								id: uid(),
								label: 'ERR-1070',
								story:
									'Создается лишняя сессия учётной записи пула приложений Web-клиента при аутентификации пользователя и при запуске Конструктора Web-разметок.',
							},
							{
								id: uid(),
								label: 'ERR-1069',
								story: 'При закрытии конструктора Web-разметок не освобождается лицензия.',
							},
							{
								id: uid(),
								label: 'ERR-1259',
								story:
									'Параметрический поиск. Не возвращаются последние результаты поиска после возврата назад из карточки.',
							},
							{
								id: uid(),
								label: 'ERR-0001',
								story:
									'В окне поиска нельзя было выбрать сотрудника с флагом Не показывать при выборе.',
							},
							{
								id: uid(),
								label: 'ERR-1217',
								story: 'После изменения файла не обновляется версия.',
							},
							{
								id: uid(),
								label: 'ERR-1216',
								story:
									'После разворачиваниясворачивания папки в боковом меню счетчик непрочитанных сбивается на предыдущее значение.',
							},
						],
					},
				],
			},
			{
				id: '6',
				label: '5.5.5957.141',
				children: [
					{
						id: uid(),
						label: 'Функциональные изменения',
						icon: 'mdi-briefcase-outline',
						children: [],
					},
					{
						id: uid(),
						label: 'Оптимизации',
						icon: 'mdi-rocket-launch',
						children: [],
					},
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						children: [
							{
								id: uid(),
								label: 'ERR-1229',
								story:
									'Сессия со счётчиками продолжает быть активной после закрытия основной сессии по таймауту еще какое-то время.',
							},
							{
								id: uid(),
								label: 'ERR-1208',
								story:
									'Зависание сохранения карточки при использовании args.cancel() в скрипте события «On preparing card save».',
							},
							{
								id: uid(),
								label: 'ERR-1222',
								story:
									'Отображается пустая страница при нажатии кнопки "Назад" из карточки, если перед этим переключать файлы в filePreview.',
							},
							{ id: uid(), label: 'ERR-0002', story: 'Не сохраняется значение нумератора.' },
							{
								id: uid(),
								label: 'ERR-1206',
								story:
									'Отсутствует контроллер EmployeesController, без которого невозможна работа EmployeesAutoComplete.',
							},
							{
								id: uid(),
								label: 'ERR-1184',
								story:
									'При создании задания по карточке документа в предпросмотре отображается по умолчанию дополнительный файл, а не основной.',
							},
							{
								id: uid(),
								label: 'ERR-1184',
								story:
									'При создании задания по карточке документа в предпросмотре отображается по умолчанию дополнительный файл, а не основной.',
							},
							{
								id: uid(),
								label: 'ERR-1159',
								story:
									'Новый грид. При открытии непрочитанной карточки счетчик в папке не уменьшается.',
							},
							{
								id: uid(),
								label: 'ERR-0003',
								story: 'Правка для сценария автоматического объединения версий.',
							},
							{
								id: uid(),
								label: 'ERR-283',
								story: 'Не работает прокрутка в боковом меню на ios.',
							},
							{
								id: uid(),
								label: 'ERR-1001',
								story: 'Некорректное отображение кодировки файла при предпросмотре.',
							},
							{
								id: uid(),
								label: 'ERR-947',
								story:
									'Если в карточке нет файла, то в превью файла отображается файл из последней открытой карточки.',
							},
							{
								id: uid(),
								label: 'ERR-1055',
								story: 'Вместо результатов поиска отображается пустая страница.',
							},
							{
								id: uid(),
								label: 'ERR-961',
								story:
									'Не всплывает окно с избранными сотрудниками при получении фокуса StaffDirectoryItems.',
							},
							{
								id: uid(),
								label: 'ERR-909',
								story: 'Неправильный порядок этапов в ходе согласования.',
							},
						],
					},
				],
			},
			{
				id: '7',
				label: '5.5.5957.117',
				children: [
					{
						id: uid(),
						label: 'Функциональные изменения',
						icon: 'mdi-briefcase-outline',
						children: [],
					},
					{
						id: uid(),
						label: 'Оптимизации',
						icon: 'mdi-rocket-launch',
						children: [],
					},
					{
						id: uid(),
						label: 'Исправленные ошибки',
						icon: 'mdi-alert-circle-outline',
						children: [
							{
								id: uid(),
								label: 'ERR-1022',
								story:
									'Контролы Employee и MultipleEmployees. При повторном клике по "Показать последние" список не раскрывается.',
							},
							{
								id: uid(),
								label: 'ERR-1026',
								story:
									'Отображение контрола FilePicker в таблице - отсутствует кнопка удаления файла.',
							},
							{
								id: uid(),
								label: 'ERR-906',
								story:
									'При отмене поиска по атрибутам происходит долгая загрузка страницы и перенаправление на предыдущую папку.',
							},
							{
								id: uid(),
								label: 'ERR-901',
								story: 'Не применяется сортировка в поисковых папках в старом гриде.',
							},
							{
								id: uid(),
								label: 'ERR-988',
								story: 'Проблемы с сохранением карточек задания в разметке просмотра.',
							},
							{
								id: uid(),
								label: 'ERR-921',
								story:
									'После ухода сессии в офлайн, вторая сессия Web-клиента продолжает оставаться активной и выполняет расчёт счетчиков.',
							},
							{
								id: uid(),
								label: 'ERR-919',
								story:
									'Некорректна работа инсталлятора при отдельной установке конструктора Web-разметок от сервера Web-клиента.',
							},
							{
								id: uid(),
								label: 'WebC-10940',
								story:
									'Изменение контрола ввода комментария при завершении задания на согласование с TextBox на TextArea.',
							},
							{
								id: uid(),
								label: 'ERR-804',
								story:
									'После экспорта представления из Web-клиента в Excel в конец строк экспортированного файла добавляется пробел.',
							},
							{
								id: uid(),
								label: 'WebC-11191',
								story:
									'Не отображается комментарий к решению в задании и в контроле Ход согласования связанного документа.',
							},
							{
								id: uid(),
								label: 'WebC-11132',
								story:
									'Не заполняется значение в контроле "Записи справочника сотрудников" с режимом редактирования по месту.',
							},
							{
								id: uid(),
								label: 'WebC-11130',
								story: 'Не работают условия выбора по виду карточки в диалоге делегирования.',
							},
							{
								id: uid(),
								label: 'WebC-11022',
								story: 'Контрол Выбор папки. Некорректная работа контрола.',
							},
							{
								id: uid(),
								label: 'WebC-11046',
								story:
									'Если карточку документа подписать простой подписью, то у подписи добавляется лишнее поле "За кого" и фамилия подписанта.',
							},
							{
								id: uid(),
								label: 'WebC-10974',
								story:
									'Справочник сотрудников. В должности отображаются сотрудники из ранее выбранной должности.',
							},
						],
					},
				],
			},
		],
	},
]

export { errors }