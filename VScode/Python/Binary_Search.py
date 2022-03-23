def Binary_Search(array, target, start, end):
    if start > end:
        return None

    mid = (start+end) // 2

    if array[mid] == target:
        return mid

    elif array[mid] > target:
        return Binary_Search(array, target, start, mid-1)

    elif array[mid] < target:
        return Binary_Search(array, target, mid+1, end)
    
target = int(input("찾을 수:"))
arrays = list(map(int, input().split()))
end = len(arrays)-1

result = Binary_Search(arrays, target, 0, end)

if result == None:
    print("값 존재하지 않음")
else:
    print(result+1)