// localStorage.setItem('eztask', `Cập nhật phân trang cho danh sách chi tiết để đỡ lag				Task	P0	Thien				
// Chuyển pop-up thêm/sửa bảng giá sang trang thêm/sửa				Task	P0	Thien				
// Bổ sung đơn giá cho toàn bộ đơn vị quy đổi				Task	P0	Huy				
// Lưu thứ tự chi tiết phiếu, đẩy cột "MÃ HH-VT" sang bên phải cột "TÊN SẢN PHẨM HÀNG HOÁ"				Task	P0	Huy				
// Thêm báo cáo "Sổ nhật ký nhập - xuất HH - VT"				Task	P0	Huy				
// Thêm giá trị tổng của phiếu trong sổ nhật ký chung				Task	P0	Thien				
// Báo cáo bán hàng theo nhóm phân cấp: lấy options "Nhóm theo" từ nhãn nhóm HH-VT				Task	P0	Thien				
// Bán cáo bán hàng (Mẫu 2): lấy options "Nhóm theo" và "Chi tiết theo" từ nhãn nhóm HH-VT				Task	P0	Huy				
// Tổng hợp nhập - xuất - tồn kho: lấy options "Nhóm theo" từ nhãn nhóm HH-VT				Task	P0	Huy				
// Xem/Thêm/Sửa/Xóa năm tài chính				Task	P0	Thien				
// Xem/Thêm/Sửa/Xóa chế độ kế toán				Task	P0	Thien				
// Xem/Thêm/Sửa/Xóa nhóm tài khoản				Task	P0	Thien				
// Xem/Thêm/Sửa/Xóa loại tài khoản				Task	P0	Thien				
// Xem/Thêm/Sửa/Xóa tài khoản kế toán				Task	P0	Thien				
// Báo cáo bán hàng phần cấp bị lỗi dung lượng xuất file excel lớn. (lỗi 413).				Bug	P0	Bao				
// Cập nhật PRD chức năng "Phiếu nhập mua"				Task	P0	Huy				
// Cập nhật PRD chức năng "Phiếu xuất bán"				Task	P0	Huy				
// Cập nhật PRD chức năng "Phiếu nhập trả"				Task	P0	Huy				
// Cập nhật PRD chức năng "Phiếu xuất trả"				Task	P0	Thien				
// Cập nhật PRD chức năng "Phiếu xuất khác"				Task	P0	Thien				
// Tìm hiểu nghiệp vụ và cập nhật PRD chức năng "Kiểm kê kho"				Task	P0	Thien				
// Viết PRD chức năng "Hồ sơ tài khoản đầu năm"				Task	P0	Huy				`)
const data = localStorage.getItem('eztask');
document.querySelector('#content').innerHTML += `<div class="inputTask" style="display: flex;">
    <textarea type="text" id="task_list_ex" rows="50" cols="50" style="height: 50px"></textarea>
    <div style="display: flex; flex-direction: column">
    <input id="save-ex-task" type="button" value="save"/>
    <input class="clear-task" value="clear" type="button"/></div>
  </div>`

document.querySelector('#save-ex-task').onclick = () => {
    console.log('save');
    localStorage.setItem(
        "eztask",
        document.querySelector("#task_list_ex").value
    );
    localStorage.setItem('prevTaskSelect', 0)
    document.querySelector("#task_list_ex").value = ''
    window.location.reload();
}
if (data) {
    const listData = data.split('\n');
    const prevTask = localStorage.getItem('prevTaskSelect') || 0;
    const listTask = [];
    let listOption = '';


    const selectTypeIssue = document.querySelector('#issue_tracker_id')
    const subjectIssue = document.querySelector('#issue_subject')
    const piorityIssue = document.querySelector('#issue_priority_id')
    const assignIssue = document.querySelector('#issue_assigned_to_id')



    if (listData) {
        listData.forEach((e) => {
            listTask.push({
                title: e.split('\t\t\t\t')[0],
                type: e.split('\t\t\t\t')[1].split('\t')[0],
                piority: e.split('\t\t\t\t')[1].split('\t')[1],
                assign: e.split('\t\t\t\t')[1].split('\t')[2],
            })
        })
    }
    console.log(listTask);

    listTask.forEach((e, index) => {
        listOption += `<option value="${index}">${index}. ${e.type} for ${e.assign}</option>`
    })
    document.querySelector('#issue_is_private_wrap').innerHTML += `<select id="select-task" > ${listOption}</select> <input class="clear-task" value="clear" type="button"/>`
    const selectElement = document.querySelector('#select-task')
    selectElement.value = prevTask;
    fillTask(prevTask)

    selectElement.onchange = (evt) => {
        localStorage.setItem('prevTaskSelect', evt.target.value)
        fillTask(evt.target.value)
    }

    document.querySelectorAll('.clear-task').forEach(e => {
        e.onclick = () => {
            console.log('clear');
            localStorage.removeItem("eztask");
            localStorage.removeItem("prevTaskSelect");
            window.location.reload();
        }
    })
    function fillTask(index) {

        const item = listTask[index];
        subjectIssue.value = item.title
        switch (item.type) {
            case 'Bug':
                selectTypeIssue.value = 1;
                break;
            case 'Task':
                selectTypeIssue.value = 2;
                break;
            case 'Support':
                selectTypeIssue.value = 4;
                break;
            case 'Hotfix':
                selectTypeIssue.value = 3;
                break;
            default:
                break;
        }

        switch (item.assign) {
            case 'Thien':
                assignIssue.value = 9;
                break;
            case 'Bao':
                assignIssue.value = 5;
                break;
            case 'Huy':
                assignIssue.value = 8;
                break;
            case 'Thang':
                assignIssue.value = 6;
                break;
            default:
                break;
        }
        switch (item.piority) {
            case 'P0':
                piorityIssue.value = 2;
                break;
            case 'P1':
                piorityIssue.value = 1;
                break;
            default:
                break;
        }
    }
}