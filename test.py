import json

all_act = []
my = []
ind = True
first = True
with open("places.json", "r", encoding="utf-8") as json_file:
    data = json.load(json_file)
    #print(data)
    for club in data["places"]:
        help_act = { }
        for activity in club["activities"]:
           help_act[activity] = True 
        #print(help_act)
        club["activities"] = help_act
    print(data)

    """    
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
    """
    with open("places1.json", "w", encoding="utf-8") as write_json:
        json.dump(data, write_json, ensure_ascii=False)