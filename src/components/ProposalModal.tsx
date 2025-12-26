// src/components/ProposalModal.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, X } from 'lucide-react';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '@/config/firebase';

interface ProposalModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState<'verify' | 'form'>('verify');
  const [loading, setLoading] = useState(false);
  const [verifiedId, setVerifiedId] = useState('');
  const [proposalData, setProposalData] = useState({
    title: '',
    description: '',
    institutionalMail: '',
    proposalType: 'Research' as 'Research' | 'Project'
  });
  const db = getFirestore(app);

  const verifyId = async () => {
    const id = (document.getElementById('proposal-id') as HTMLInputElement)?.value?.trim();
    if (!id) return alert('Enter AUSTRC ID');

    setLoading(true);
    try {
      const studentDoc = await getDoc(doc(db, 'AllData', 'StudentAUSTRCID', id));
      if (studentDoc.exists()) {
        setVerifiedId(id);
        setStep('form');
      } else {
        alert('Invalid AUSTRC ID');
      }
    } catch (error) {
      alert('Verification failed');
    }
    setLoading(false);
  };

  const submitProposal = async () => {
    const { title, description, institutionalMail, proposalType } = proposalData;
    if (!title || !description || !institutionalMail) return alert('Fill all fields');
    if (description.split(/\s+/).length > 100) return alert('Max 100 words');

    setLoading(true);
    try {
      await setDoc(doc(db, 'AllData', 'StudentProposalforRP', 'studentproposalforRP', verifiedId), {
        proposalType, Title: title, ShortDes: description, InstitutionalMail: institutionalMail,
        timestamp: serverTimestamp()
      });
      alert('✅ Proposal submitted!');
      onSuccess();
      onClose();
    } catch (error) {
      alert('Submit failed');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-white/95 to-slate-50 rounded-3xl max-w-md w-full shadow-2xl border border-[#2E7D32]/20 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] bg-clip-text text-transparent">
              Submit Proposal
            </h2>
            <Button onClick={onClose} variant="ghost" className="h-10 w-10 p-0">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {step === 'verify' ? (
            <>
              <div className="p-6 bg-green-50 border-2 border-dashed border-green-200 rounded-2xl text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="font-semibold text-green-800">Enter AUSTRC ID</p>
              </div>
              <Input id="proposal-id" placeholder="AUSTRC001" className="h-14 text-lg rounded-2xl" />
              <Button onClick={verifyId} disabled={loading} className="w-full h-14 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]">
                {loading ? <Loader2 className="w-6 h-6 mr-2 animate-spin" /> : null} Verify
              </Button>
            </>
          ) : (
            <>
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
                <div className="flex items-center">
                  <CheckCircle className="w-10 h-10 text-green-500 mr-3" />
                  <div>
                    <p className="font-bold text-green-800">Verified: {verifiedId}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(['Research', 'Project'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={proposalData.proposalType === type ? 'default' : 'outline'}
                    onClick={() => setProposalData({...proposalData, proposalType: type})}
                  >
                    {type}
                  </Button>
                ))}
              </div>

              <Input
                placeholder="Title"
                value={proposalData.title}
                onChange={(e) => setProposalData({...proposalData, title: e.target.value})}
                className="h-14"
              />
              <Input
                placeholder="Description (100 words)"
                value={proposalData.description}
                onChange={(e) => setProposalData({...proposalData, description: e.target.value})}
                className="h-28 py-4"
              />
              <Input
                type="email"
                placeholder="Institutional email"
                value={proposalData.institutionalMail}
                onChange={(e) => setProposalData({...proposalData, institutionalMail: e.target.value})}
                className="h-14"
              />

              <Button onClick={submitProposal} disabled={loading} className="w-full h-14 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]">
                {loading ? <Loader2 className="w-6 h-6 mr-2 animate-spin" /> : null} Submit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
