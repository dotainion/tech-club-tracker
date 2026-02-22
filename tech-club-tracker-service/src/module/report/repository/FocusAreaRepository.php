<?php
namespace src\module\report\repository;

use src\infrastructure\Repository;
use src\module\report\factory\FocusAreaFactory;
use src\module\report\objects\FocusArea;
use tools\infrastructure\Collector;

class FocusAreaRepository extends Repository{
    protected FocusAreaFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new FocusAreaFactory();
    }
    
    public function create(FocusArea $focusArea):void{
        $this->insert('focusArea')
            ->column('focusAreaId', $this->uuid($focusArea->id()))
            ->column('reportId', $this->uuid($focusArea->reportId()))
            ->column('groupId', $this->uuid($focusArea->groupId()))
            ->column('topic', $focusArea->topic())
            ->column('date', $focusArea->date())
            ->column('lessonDetail', $focusArea->lessonDetail())
            ->column('engagement', $focusArea->engagement())
            ->column('resources', $focusArea->resources());
        $this->execute();
    }
    
    public function edit(FocusArea $focusArea):void{
        $this->update('focusArea')
            ->column('reportId', $this->uuid($focusArea->reportId()))
            ->column('groupId', $this->uuid($focusArea->groupId()))
            ->column('topic', $focusArea->topic())
            ->column('lessonDetail', $focusArea->lessonDetail())
            ->column('engagement', $focusArea->engagement())
            ->column('resources', $focusArea->resources())
            ->where()->eq('focusAreaId', $this->uuid($focusArea->id()));
        $this->execute();
    }
    
    public function deleteFocusArea(FocusArea $focusArea):void{
        $this->delete('focusArea')
            ->where()->eq('focusAreaId', $this->uuid($focusArea->id()));
        $this->execute();
    }

    public function listFocusArea(array $where = []):Collector{
        $this->select('focusArea');

        if(isset($where['focusAreaId'])){
            $this->where()->eq('focusAreaId', $this->uuid($where['focusAreaId']));
        }
        if(isset($where['reportId'])){
            $this->where()->eq('reportId', $this->uuid($where['reportId']));
        }
        if(isset($where['groupId'])){
            $this->where()->eq('groupId', $this->uuid($where['groupId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}