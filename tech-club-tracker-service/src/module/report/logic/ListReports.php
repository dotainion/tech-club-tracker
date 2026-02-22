<?php
namespace src\module\report\logic;

use src\module\report\repository\ReportRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use tools\infrastructure\Request;

class ListReports extends BindReportDependencies{

    protected ReportRepository $repo;
    protected Request $request;

    public function __construct() {
        parent::__construct();
        $this->repo =new ReportRepository();
        $this->request = new Request();
    }

    public function requst():Request{
        return $this->request;
    }

    public function list(
        ?Id $reportId = null,
        ?Id $schoolId = null,
        ?Id $facilitatorId = null,
        ?bool $published = null
    ):Collector{
        $collector = $this->repo->listReports([
            'reportId' => $reportId,
            'schoolId' => $schoolId,
            'facilitatorId' => $facilitatorId,
            'published' => $published,
            'limit' => $this->request->get('limit'),
            'offset' => $this->request->get('offset'),
            'date' => $this->request->get('date'),
            'from' => $this->request->get('start'),
            'to' => $this->request->get('end')
        ]);
        return $this->bindDependencies($collector);
    }
}