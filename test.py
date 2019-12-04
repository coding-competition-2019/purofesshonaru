import json

all_act = []
my = []
ind = True
first = True
with open("places.json", "r", encoding="utf-8") as json_file:
    data = json.load(json_file)
    for club in data["places"]:
        for activity in club["activities"]:
            all_act.append(activity)
    
    for activity in all_act:
        if first:
            my.append(activity)
            first = False
        else:
            for i in range(len(my)):
                if my[i] == activity:
                    break
                elif i == len(my)-1:
                    my.append(activity)
                else:
                    continue
    with open("activities.json", "w", encoding="utf-8") as write_json:
        json.dump(my, write_json, ensure_ascii=False)
        